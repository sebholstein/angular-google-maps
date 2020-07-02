const glob = require('glob');
const fs = require('fs');

const googleAnalytics = `
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-72230441-1', 'auto');
  ga('send', 'pageview');
</script>
`

glob(__dirname + '/../docs/public/api-docs/agm-*/**/*.html', null, (err, files) => {
  if (err) {
    console.log(err);
    process.exit(3);
  }

  files.forEach((file) => {
    console.log('replacing file', file);
    let fileContent = fs.readFileSync(file, 'utf-8');
    fileContent = fileContent.replace('</head>', googleAnalytics + '\n</head>');
    fs.writeFileSync(file, fileContent, 'utf-8');
  });
})