$(function () {
// 区域滚动配置
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: false //是否启用回弹
    });
    // 跳转搜索页面
    $('.searchDetailBody .search').on('tap', function () {
        location.href = 'search.html' + location.search
    })
    // 显示标题&key
    var key = pubObj.getDataURL(location.search)
    document.title = key + '-商品搜索'
    $('.searchDetailBody .search input').val(key)
    //排序
    window.params = {
        proName: key,
        page: 0,
        pageSize: 2
    }
    $('.searchDetailBody .sort ul li').on('tap', function () {
        //mui('.mui-scroll-wrapper').pullRefresh().pullupLoading();
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).hasClass('active')) {
            //判断升序或降序
            $(this).siblings().find('span').addClass('mui-icon-arrowdown').removeClass('mui-icon-arrowup now')
            if ($(this).find('span').hasClass('now')) {
                $(this).find('span').addClass('mui-icon-arrowup').removeClass('mui-icon-arrowdown now')
            } else {
                $(this).find('span').addClass('mui-icon-arrowdown now').removeClass('mui-icon-arrowup')
            }
            var order = $(this).find('span').hasClass('now') ? 2 : 1
            params = {
                proName: key,
                page: 1,
                pageSize: 2
            }
            params[$(this).attr('data-title')] = order
            params['flag'] = true;
            console.log(params);
            $('.searchDetailBody .searchDetail ul').empty()
            renderResult(params)
        }

    })
    // 渲染查询结果
    function renderResult(params) {
        getSearchData(params, function (data) {
            $('.searchDetailBody .searchDetail ul').append(template('searchDetailList', data))
        })
    }
    // 获取数据
    function getSearchData(params, callback) {
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: params,
            success: function (data) {
                console.log(data);
                return callback && callback(data)
            }
        })
    }
    // 上拉加载,下拉刷新
    mui.init({
        pullRefresh: {
            container: "#dataFlag",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                auto:true,
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: pullfreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                // auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    function pullfreshUp() {
        var flag = false
        var _this = this
        params.page = params.page + 1
        getSearchData(params, function (data) {
            $('.searchDetailBody .searchDetail ul').append(template('searchDetailList', data))
            if (data.data.length <= 0) {
                flag = true
            }
            _this.endPullupToRefresh(flag);
            // 场景切换下拉加载可用
            if (flag) {
                setTimeout(function () {
                    _this.disablePullupToRefresh()
                    setTimeout(function () {
                        _this.enablePullupToRefresh()
                        $('.mui-pull-caption.mui-pull-caption-down').text('')
                    },1000)
                }, 2000)
            }
        })
    }
    function pullfreshDown() {
        var flag = false
        var _this = this
        getSearchData({
            proName: key,
            page: 1,
            pageSize: 2
        }, function (data) {
            var hml = template('searchDetailList', data)
            if (data.data.length <= 0) {
                flag = true
            }
            $('.searchDetailBody .searchDetail ul').append(hml)
            _this.endPulldownToRefresh(flag)
        })
    }

    $('#detail ul').on('tap','li', function () {
        location.href = 'product.html?productId=' + $(this).attr('data-productId')
    })
})
