$(function () {
    var searchHis = []
    var getSearchData = function(){
        return JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    };
    (function () {
        var searchListData = getSearchData()
        console.log(searchListData.length);
        if (searchListData.length === 0) {
            $('.searchBody .searchResult').append('<p class="nothing"><span>没有历史搜索记录</span></p>')
            return false
        }
        var html = `<p class="something">
            <span>最近搜索记录</span>
            <span class="mui-icon mui-icon-trash deleteHis"></span>
        </p><ul>`
        searchListData.map(item => {
           html += '<li>'+item+'</li>'
        })
        html += '</ul>'
        $('.searchBody .searchResult').append(html)
    })();
    //显示关键字
    var key = pubObj.getDataURL(location.search)
    if (key) {
        $('.searchBody .search input').val(key)
    } else {
        $('.searchBody .search input').attr('placeholder','爱生活，就要搜')
    }

    //历史记录数据处理
    var searchList = function (key) {
        var searchListArr = getSearchData()
        // 搜索记录重复，当前值靠前
        var searchIndex = searchListArr.findIndex(item => item === key)
        if (searchIndex !== -1) {
            searchListArr.splice(searchIndex,1)
        }
        searchListArr.unshift(key)
        localStorage.setItem('SearchHistory', JSON.stringify(searchListArr))
    }

// 浏览记录显示
    $('.search button').on('tap', function () {
        var key = $.trim($('.search input').val())
        if (!key) {
            mui.toast('请输入搜索内容',{
                position: 'center'
            })
            return false
        }
        searchList(key)
        location.href = 'searchDetail.html?key=' + key
    })
// 清空浏览记录
    $('.deleteHis').on('tap', function() {
        mui.confirm('清空浏览记录？', function(e) {
            if (e.index == 0) {
                console.log(1);
            } else {
                localStorage.clear()
                $('.searchBody .searchResult').empty().append('<p class="nothing"><span>没有历史搜索记录</span></p>')
            }
        })
    });

// 解决mui nav下a标签不能跳转问题
    mui('nav').on('tap', 'a', function () {
        document.location.href = this.href;
    });

})