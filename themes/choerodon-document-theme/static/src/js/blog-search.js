var $results, INDEX_DATA={};
    function initLunr() {
        // First retrieve the index file
        $.getJSON('/lunr.json')
            .done(function(data) {
                INDEX_DATA = data;
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.error("Error getting Hugo index flie:", err);
            });
    }
    function initUI() {
        $results = $("#content-post");
        $('#content').on('click', '#search', function(){
            //删除已有内容
            $('#content-post').html("");
            $("#content-post #blog-list").remove();
            // 删除分页
            $("#content-post #paginator").remove();
            var query = $("#search-input").val();

            var results = search(query,500);
            // 无搜索结果
            if(results === undefined|| results.length===0){
                $("#content-post .noresult").remove();
                $results.append("<h1 class='noresult'>很抱歉，我们没有找到与“"+query+"“相关的博客</h1>");
            }
            else{
                renderResults(results);
            }
        });
        
    }
    function escapeReg(keyword) {
        //escape regexp prevserve word
        return String(keyword).replace(/([\*\.\?\+\$\^\[\]\(\)\{\}\|\/\\])/g, '\\$1');
    }
    
    function search(keyword,MAX_DESCRIPTION_SIZE) {
        if (keyword == null || keyword.trim() === '') return;
    
        var results = [],
            index = -1;
        for (var page in INDEX_DATA) {
            if ((index = INDEX_DATA[page].body.toLowerCase().indexOf(keyword.toLowerCase())) !== -1) {
                results.push({
                    url: INDEX_DATA[page].url,
                    title: INDEX_DATA[page].title,
                    date: INDEX_DATA[page].date,
                    author: INDEX_DATA[page].author,
                    description: INDEX_DATA[page].description,
                    tags: INDEX_DATA[page].tags,
                    categories: INDEX_DATA[page].categories,
                    img: INDEX_DATA[page].img,
                    body: INDEX_DATA[page].body.substr(Math.max(0, index - 50), MAX_DESCRIPTION_SIZE).replace(new RegExp('(' + escapeReg(keyword) + ')', 'gi'), '<span style="background:#ff0;">$1</span>')
                });
            }
        }
        return results;
    }
    

    function renderResults(results) {
        if (!results.length) {
            return;
        }
        $("#content-post .noresult").remove();
        // Only show the ten first results
        var language = "/zh/";
        if (window.location.href.indexOf("/en/") != -1){
            language = "/en/"
        }
        results.slice(0, 10).forEach(function(result) {
            var tags ="分类";
            var author = "作者";            
            if (language == "/en/"){
                tags = "Tags";
                author = "Author";
            }
            var $result = $('<div class="row blog-list" id="blog-list"></div>');
            var $contentDiv = $('<div class="blog-list-content" style="width:100%">');
            var $divA = $('<a href="'+ language + result.url +'"class="right-title">'+ result.title +'</a>');
            var $info = $('<div class="right-info"><span class="right-user">'+ author +'：<span>'+ result.author +'</span></span><span class="right-categories">'+ tags +': <a href="'+ language +'/categories/'+ result.categories[0].toLowerCase() +'">'+ result.categories[0] +'</a></span><span class="right-time"><i class="iconfont">&#xe8cf;</i>'+ result.date +'</span></div>');
            var $text = $('<div class="right-text">'+result.body +'</div>');
            var $tags = $('<ul class="right-tags">');
            for (index=0; index < result.tags.length; index++){
                $tags.append('<li class="tag"><a class="tag-text" href="'+ language +'/tags/'+ result.tags[index].toLowerCase() +'"><i class="iconfont">&#xe844;</i> '+result.tags[index]+'</a></li>')
            }
            $tags.append('</ul');
            var $contentDivEnd = '</div>';
            var $resultDivEnd = '</div>';
            $contentDiv.append($divA);
            $contentDiv.append($info);
            $contentDiv.append($text);
            $contentDiv.append($tags);
            $contentDiv.append($contentDivEnd);

            $result.append($contentDiv);
            $result.append($resultDivEnd);
            $results.append($result);
        });
    }

    $(document).ready(function() {
        initLunr();
        initUI();
    });