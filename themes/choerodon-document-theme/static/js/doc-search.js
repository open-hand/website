var $results, INDEX_DATA={};
    function initLunr() {
        // First retrieve the index file
        $.getJSON('/docslunr.json')
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
            var query = $("#search-input").val();

            var results = search(query,500);
            
            // 无搜索结果
            if(results === undefined|| results.length===0){
                $("#content-post .noresult").remove();
                $results.append("<h1 class='noresult'>很抱歉，我们没有找到与“"+query+"“相关的文档</h1>");
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
                    url: INDEX_DATA[page].url.toLowerCase(),
                    title: INDEX_DATA[page].title,
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
            var $result = $('<div class="result-row">');
            var $divA = $('<a href="'+ language + result.url +'"class="right-title">'+ result.title +'</a>');
            var $text = $('<div class="right-text">'+result.body +'</div>');
            var $resultDivEnd = '</div>';

            $result.append($divA);
            $result.append($text);
            $result.append($resultDivEnd);
            $results.append($result);
        });
    }

    $(document).ready(function() {
        initLunr();
        initUI();
    });