$(function () {
    var searchHis = []
    var getSearchData = function(){
        return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]');
    };
    //显示关键字
    console.log(location.search);
    var key = pubObj.getDataURL(location.search)
    if (key) {
        $('.searchBody .search input').val(key)
    } else {
        $('.searchBody .search input').attr('placeholder','爱生活，就要搜')
    }


    var searchHisShow = function (key) {
        var searchIndex = searchHis.findIndex(item => item === key)
        if (searchIndex !== -1) {
            searchHis.splice(searchIndex,1)
        }
        searchHis.unshift(key)
        $('.searchBody .searchResult ul').empty()
        searchHis.map(item => {
            $('.searchBody .searchResult ul').append('<li>'+item+'</li>')
        })
        if ($('.searchBody .searchResult .something').hasClass('hide')) {
            $('.searchBody .searchResult .nothing').addClass('hide')
            $('.searchBody .searchResult .something').removeClass('hide')
        }
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
        location.href = 'searchDetail.html?key=' + key
        searchHisShow(key)
    })
// 清空浏览记录
    $('.deleteHis').on('tap', function() {
        mui.confirm('清空浏览记录？', function(e) {
            if (e.index == 0) {
                console.log(1);
            } else {
                $('.searchBody .searchResult .nothing').removeClass('hide')
                $('.searchBody .searchResult .something').addClass('hide')
                $('.searchBody .searchResult ul').empty()
            }
        })
    });

// 解决mui nav下a标签不能跳转问题
    mui('nav').on('tap', 'a', function () {
        document.location.href = this.href;
    });

})