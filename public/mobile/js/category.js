$(function () {
    // 选择列表左，同时右对应
    $('.categoryBody .left').on('click','a', function () {
        var id = $(this).parent().attr('id')
        // 删除多余div
        $('.categoryBody .right .container .noData').remove()
        // 点击选择左边列表
        $(this).parent().siblings().removeClass('mui-active')
        $(this).parent().addClass('mui-active');
        // 右边列表随左边列表变化
        $('.categoryBody .right .move').removeClass('active')
        $('.categoryBody .right .move[id="'+id+'"]').addClass('active')
        // 当无商品展示时，显示
        if (!$('.categoryBody .right .active').length) {
            $('.categoryBody .right .container').append('<div class="move active noData"><p>该分类暂无商品</p></div>')
        }
    })
// 获取category左边列表数据
    var getCategoryLeft = function (callback){
        $.ajax({
            url:'/category/queryTopCategory',
            type:'get',
            dataType: 'json',
            success:function (data) {
                return callback && callback(data)
            }
        })
    }
// 获取category右边列表数据
    var getCategoryRight = function (params, callback) {
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:'id=' + params,
            success:function (data) {
                return callback && callback(data)
            }
        })
    }
// 展示列表
    getCategoryLeft(function (data) {
        data.rows.map(item => {
            getCategoryRight(item.id, function (result) {
                // 有则展示，无责说明
                if (result.total) {
                    $('.categoryBody .right .container').append(template('categoryRight', result))
                }
                $('.categoryBody .right .container div:first-child').addClass('active')
            })
        })
        $('.categoryBody .left ul').append(template('categoryLeft', data))
    })


// 解决mui nav下a标签不能跳转问题
    mui('nav').on('tap', 'a', function () {
        document.location.href = this.href;
        $(this).addClass('mui-active').siblings().removeClass('mui-active')
    });
// 区域滚动配置
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