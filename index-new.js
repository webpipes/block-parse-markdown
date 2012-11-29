var marked = require('marked');
var webpipes = require('node-webpipe');

// Option 1: Chaining API
new webpipes.Block()
  .name("Parse Markdown")
  .description("Converts Markdown to HTML.")
  .input("markdown", "string", "Markdown-formatted content for transformation.")
  .output("html", "string", "HTML-converted data.")
  .handle(function(inputs) {
    return { html: marked(inputs.markdown) };
  })
  .listen();

// Option 2: Pass in block definition
// var block = new webpipes.Block({
//   "name": "Parse Markdown",
//   "description": "Converts Markdown to HTML.",
//   "inputs": [{
//       "name": "markdown",
//       "type": "string",
//       "description": "Markdown-formatted content for transformation."
//   }],
//   "outputs": [{
//       "name": "html",
//       "type": "string",
//       "description": "HTML-converted data."
//   }]
//  }, function(inputs) {
//   return { html: marked(inputs.markdown) };
// });
// http.createServer(block.nodeHandler()).listen(process.env.PORT || 3000);
