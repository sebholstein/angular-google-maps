#!/usr/bin/env bash

# Source: https://github.com/X1011/git-directory-deploy
# BSD 3-Clause License:

# Copyright Daniel Smith
# All rights reserved.

# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:

#   Redistributions of source code must retain the above copyright notice, this
#   list of conditions and the following disclaimer.
# 
#   Redistributions in binary form must reproduce the above copyright notice, this
#   list of conditions and the following disclaimer in the documentation and/or
#  other materials provided with the distribution.
# 
#   The names of the contributors may not be used to endorse or promote products
#   derived from this software without specific prior written permission.
# 
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
# ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

set -o errexit #abort if any command fails

main() {
	deploy_directory=${GIT_DEPLOY_DIR:-docs_generated}
	deploy_branch=${GIT_DEPLOY_BRANCH:-gh-pages}

	#if no user identity is already set in the current git environment, use this:
	default_username=${GIT_DEPLOY_USERNAME:-SebastianM}
	default_email=${GIT_DEPLOY_EMAIL:-"info@sebastian-mueller.net"}

	#repository to deploy to. must be readable and writable.
	repo=${GIT_DEPLOY_REPO:-origin}
	
	#append commit hash to the end of message by default
	append_hash=true
	
	# Parse arg flags
	while : ; do
		if [[ $1 = "-v" || $1 = "--verbose" ]]; then
			verbose=true
			shift
		elif [[ $1 = "-e" || $1 = "--allow-empty" ]]; then
			allow_empty=true
			shift
		elif [[ ( $1 = "-m" || $1 = "--message" ) && -n $2 ]]; then
			commit_message=$2
			shift 2
		elif [[ $1 = "-n" || $1 = "--no-hash" ]]; then
			append_hash=false
			shift
		else
			break
		fi
	done
	
	enable_expanded_output

	if ! git diff --exit-code --quiet --cached; then
		echo Aborting due to uncommitted changes in the index >&2
		return 1
	fi

	commit_title=`git log -n 1 --format="%s" HEAD`
	commit_hash=` git log -n 1 --format="%H" HEAD`
	
	#default commit message uses last title if a custom one is not supplied
	if [[ -z $commit_message ]]; then
		commit_message="publish: $commit_title"
	fi
	
	#append hash to commit message unless no hash flag was found
	if [ $append_hash = true ]; then
		commit_message="$commit_message"$'\n\n'"generated from commit $commit_hash"
	fi
		
	previous_branch=`git rev-parse --abbrev-ref HEAD`

	if [ ! -d "$deploy_directory" ]; then
		echo "Deploy directory '$deploy_directory' does not exist. Aborting." >&2
		return 1
	fi
	
	# must use short form of flag in ls for compatibility with OS X and BSD
	if [[ -z `ls -A "$deploy_directory" 2> /dev/null` && -z $allow_empty ]]; then
		echo "Deploy directory '$deploy_directory' is empty. Aborting. If you're sure you want to deploy an empty tree, use the --allow-empty / -e flag." >&2
		return 1
	fi

	if git ls-remote --exit-code $repo "refs/heads/$deploy_branch" ; then
		# deploy_branch exists in $repo; make sure we have the latest version
		
		disable_expanded_output
		git fetch --force $repo $deploy_branch:$deploy_branch
		enable_expanded_output
	fi

	# check if deploy_branch exists locally
	if git show-ref --verify --quiet "refs/heads/$deploy_branch"
	then incremental_deploy
	else initial_deploy
	fi

	restore_head
}

initial_deploy() {
	git --work-tree "$deploy_directory" checkout --orphan $deploy_branch
	git --work-tree "$deploy_directory" add --all
	commit+push
}

incremental_deploy() {
	#make deploy_branch the current branch
	git symbolic-ref HEAD refs/heads/$deploy_branch
	#put the previously committed contents of deploy_branch into the index
	git --work-tree "$deploy_directory" reset --mixed --quiet
	git --work-tree "$deploy_directory" add --all

	set +o errexit
	diff=$(git --work-tree "$deploy_directory" diff --exit-code --quiet HEAD --)$?
	set -o errexit
	case $diff in
		0) echo No changes to files in $deploy_directory. Skipping commit.;;
		1) commit+push;;
		*)
			echo git diff exited with code $diff. Aborting. Staying on branch $deploy_branch so you can debug. To switch back to master, use: git symbolic-ref HEAD refs/heads/master && git reset --mixed >&2
			return $diff
			;;
	esac
}

commit+push() {
	set_user_id
	git --work-tree "$deploy_directory" commit -m "$commit_message"

	disable_expanded_output
	#--quiet is important here to avoid outputting the repo URL, which may contain a secret token
	git push --quiet $repo $deploy_branch
	enable_expanded_output
}

#echo expanded commands as they are executed (for debugging)
enable_expanded_output() {
	if [ $verbose ]; then
		set -o xtrace
		set +o verbose
	fi
}

#this is used to avoid outputting the repo URL, which may contain a secret token
disable_expanded_output() {
	if [ $verbose ]; then
		set +o xtrace
		set -o verbose
	fi
}

set_user_id() {
	if [[ -z `git config user.name` ]]; then
		git config user.name "$default_username"
	fi
	if [[ -z `git config user.email` ]]; then
		git config user.email "$default_email"
	fi
}

restore_head() {
	if [[ $previous_branch = "HEAD" ]]; then
		#we weren't on any branch before, so just set HEAD back to the commit it was on
		git update-ref --no-deref HEAD $commit_hash $deploy_branch
	else
		git symbolic-ref HEAD refs/heads/$previous_branch
	fi
	
	git reset --mixed
}

filter() {
	sed -e "s|$repo|\$repo|g"
}

sanitize() {
	"$@" 2> >(filter 1>&2) | filter
}

[[ $1 = --source-only ]] || main "$@"