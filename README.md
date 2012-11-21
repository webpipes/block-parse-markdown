# Parse Markdown Action Block

## Example Usage

	curl -v -X OPTIONS http://block-parse-markdown.herokuapp.com
	
	curl -i -X POST -d '{"input":{"markdown":"#[foo](http://bar.com)"}}' -H "Content-Type: application/json" http://block-parse-markdown.herokuapp.com