marked = require('marked')
webpipes = require('node-webpipe')

# Option 3: CoffeeScript/Ruby-like DSL
new webpipes.Block ->
  @name "Parse Markdown"
  @description "Converts Markdown to HTML."
  @input "markdown", "string", "Markdown-formatted content for transformation."
  @output "html", "string", "HTML-converted data."
  @handle (inputs) ->
    html: marked inputs.markdown
  @listen()

# Alternatively:
new webpipes.Block ->
  @name "Parse Markdown"
  @description "Converts Markdown to HTML."
  @input
    name: "markdown"
    type: "string"
    description: "Markdown-formatted content for transformation."
  @output
    name: "html"
    type: "string"
    description: "HTML-converted data."
  @handle (inputs) ->
    html: marked inputs.markdown
# .listen()
