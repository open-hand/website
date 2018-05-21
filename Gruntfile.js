var toml = require("toml");
var S = require("string");
var Entities = require('html-entities').AllHtmlEntities;
var Html = new Entities();
var marked = require("marked");

module.exports = function(grunt) {

    grunt.registerTask("index", function() {
		var generateFiles = function(documentsStore,CONTENT_PATH_PREFIX,filename) {
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
				if (filename === "_index.md") {
					href = S(abspath).chompLeft("content").chompRight(filename).s;
				}
				//去除多语言后缀
				if(href.indexOf(".zh") != -1){
					href = href.replace(".zh","");
				}else if(href.indexOf(".en") != -1){
					href = href.replace(".en","");
				}
				var content = body[2].trim();
				content = marked(content);
				content = content.replace(/\<script.*\/script\>/g,"");
				content = Html.decode(content);
				content = content.replace(/(<([^>]+)>)/ig, '');
				content = content.replace(/[\n,\r ]+/g, ' ');
				
				var entity = {
					url: href.slice(1),
					title: frontMatter.title,
					date: frontMatter.date,
					author: frontMatter.author,
					description: frontMatter.description,
					img: frontMatter.img,
					tags: frontMatter.tags,
					categories: frontMatter.categories					
				};

				entity.body=content;
				documentsStore[href] = entity;
			};
			
			grunt.file.write(filename, JSON.stringify(indexPages()));
			grunt.log.ok("Index built");
		}
		var BLOGS_PATH_PREFIX = "content/blog";
		var DOCS_PATH_PREFIX = "content/docs";
		var blogsStore = {};
		var docsStore = {};
		var blogfilename = "./static/lunr.json";
		var docsfilename = "./static/docslunr.json";
		generateFiles(blogsStore,BLOGS_PATH_PREFIX,blogfilename);
		generateFiles(docsStore,DOCS_PATH_PREFIX,docsfilename);
		
    });
};