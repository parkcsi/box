// 페이징처리
_printCommentsPage = function (__targetId, __pageholder, __scriptname){
    var pageholder = __pageholder;
    var pageDiv = document.getElementById(__targetId);
    while (pageDiv.firstChild){
        pageDiv.removeChild(pageDiv.firstChild);
    }
    
    if(pageholder != null && pageholder.totalPages > 0){
        var startPage = (Math.ceil(pageholder.currentPage/pageholder.pageSize)-1) * pageholder.pageSize + 1;
        var prevPage = startPage - pageholder.pageSize;
        var nextPage = startPage + pageholder.pageSize;
        
        if(startPage > 1){
            var anchorFirst = document.createElement("a");
            anchorFirst.setAttribute("href", "javascript:" + __scriptname + "('" + prevPage + "')");
            anchorFirst.setAttribute("class", "prev");
            anchorFirst.appendChild(document.createTextNode("이전"));
            pageDiv.appendChild(anchorFirst);
        }
        
        var ul = document.createElement("ul");
        for(var i = startPage; i < nextPage && i <= pageholder.totalPages; i++){
            var li = document.createElement("li");
            var anchor = document.createElement("a");
            if(i != pageholder.currentPage){
                anchor.setAttribute("href", "javascript:" + __scriptname + "('" + i + "')");
                anchor.setAttribute("title", i + "페이지로 이동");
            }else{
                anchor.setAttribute("href", "javascript://");
                anchor.setAttribute("class", "active");
            }
            anchor.appendChild(document.createTextNode(i));
            li.appendChild(anchor);
            ul.appendChild(li);
        }
        pageDiv.appendChild(ul);
        
        if(nextPage <= pageholder.totalPages){
            var anchorNext = document.createElement("a");
            anchorNext.setAttribute("href", "javascript:" + __scriptname + "('" + nextPage + "')");
            anchorNext.setAttribute("class", "next");
            anchorNext.appendChild(document.createTextNode("다음"));
            pageDiv.appendChild(anchorNext);
        }
    }
};