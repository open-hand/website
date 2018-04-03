var toml = require("toml");
var S = require("string");
var Entities = require('html-entities').AllHtmlEntities;
var Html = new Entities();
var marked = require("marked");

var CONTENT_PATH_PREFIX = "./content/blog";
var documentsStore = {};

module.exports = function(grunt) {

    grunt.registerTask("index", function() {
		
		 var indexPages = function() {
            var pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln("Parse file:",abspath);
                var temp=processFile(abspath, filename);
                if(temp){
                    pagesIndex.push(temp);
                }
            });

            return documentsStore;
        };
		
		var processFile = function(abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith(".md")){
                pageIndex = processMDFile(abspath, filename);
            } else {
                return null;
            }
            return pageIndex;
        };
        
		var processMDFile = function(abspath, filename) {
			var body = grunt.file.read(abspath);

			if(!body){
				return null;
			}
			body = body.split("+++");
			var frontMatter;
			try {
				frontMatter = toml.parse(body[1].trim());
			} catch (e) {
				console.log(e.message);
				return null;
			}
			
			var href = S(abspath).chompLeft("content").chompRight(".md").s;
			if (filename === "index.md") {
				href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
			}

			var content = body[2].trim();
			content = marked(content);
			content = content.replace(/\<script.*\/script\>/g,"");
			content = Html.decode(content);
			content = content.replace(/(<([^>]+)>)/ig, '');
			content = content.replace(/[\n,\r ]+/g, ' ');
			
			var doc = {
				url: href.slice(1),
                title: frontMatter.title,
                date: frontMatter.date,
                author: frontMatter.author,
                description: frontMatter.description,
                img: frontMatter.img,
                tags: frontMatter.tags,
                categories: frontMatter.categories,
				body: content
			};

			documentsStore[href] = doc;
		};
		
		grunt.file.write("./static/lunr.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
};
