import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { source } from 'common-tags';
import { addModuleImportToRootModule, addPackageToPackageJson, getLibraryVersion, getProjectFromWorkspace, getProjectMainFile } from '../utils';
import { AddOptions } from './schema';

// Just return the tree
export function ngAdd(options: AddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {

    const version = getLibraryVersion();
    addPackageToPackageJson(tree, '@agm/core', `^${version}`);
    context.logger.log(
      'info',
      `✅️ Added "@agm/core@^${version}" into dependencies`
    );

    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    return tree;
  };
}

export function ngAddSetup(options: AddOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      addModule(options),
    ]);
  }
}

function addModule(options: AddOptions) {
  return (host: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    addModuleImportToRootModule(host, appModulePath, 'AgmCoreModule', '@agm/core', source`
    AgmCoreModule.forRoot({
      apiKey: '${options.apiKey}'
    })
    `);

    return host;
  };
}
