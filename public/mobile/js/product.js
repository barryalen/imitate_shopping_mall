$(function () {

    $('.btn').on('tap', 'button', function () {
        var nums = mui('.mui-numbox').numbox().getValue()
        if (nums<=0) {
            mui.toast('请添加购买数量', {duration:1000})
            return false
        }
        if (!$('#product_content ul').hasClass('selectFlag')) {
            mui.toast('请选择尺码', {duration:1000})
            return false
        }
        var data = {
            productId: pubObj.getDataURL(location.search),
            num: nums,
            size: $('#product_content ul li.active').text()
        }
        if ($(this).hasClass('buy')) {
            // 立即购买
            mui.toast('正在编码中...')
            console.log(1);}
        else if ($(this).hasClass('addCart')) {
            // 添加购物车
            pubObj.isLogin({
                url: '/cart/addCart',
                type: 'post',
                data: data,
                success: function (data) {
                    if(data.success) {
                        mui.confirm('商品添加成功，去购物车看看？','温馨提示',['否','是'], function(e) {
                            if (e.index == 0) {
                                console.log(1);
                            } else {
                                location.href = pubObj.cartUrl
                            }
                        })
                    }
                }
            })
        }

    })
    //选择尺码
    $('#product_content').on('tap', 'ul li', function () {
        if (!$(this).parent().hasClass('selectFlag')) {
            $(this).parent().addClass('selectFlag')
        }
        $(this).addClass('active').siblings().removeClass('active')
    })
    //尺码渲染时处理，从服务端拿到的是字符串，返回数组
    template.defaults.imports.stringToArray = function (str) {
        var arr = str.split('-')
        var newArr = []
        for (var i = arr[0]; i <= arr[1]; i++) {
            newArr.push(i)
        }
        return  newArr
    }
    //获取product信息
    getProductDetail(pubObj.getDataURL(location.search), function (data) {
        $('#product_content').append(template('productDetail', data))
        //动态创建的元素，numberbox需要手动初始化
        mui('.kuCun .mui-numbox').numbox().setOption('max', data.num)
        // 轮播图初始化
        mui('.mui-slider').slider({interval:2000})
    })
    //ajax请求
    function getProductDetail(id, callback) {
        $.ajax({
            url:'/product/queryProductDetail',
            type:'get',
            data:'id=' + id,
            success: function (data) {
                console.log(data);
                return callback && callback(data)
            }
        })
    }
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: false //是否启用回弹
    });
})