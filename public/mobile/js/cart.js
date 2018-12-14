$(function () {
    //尺码渲染时处理，从服务端拿到的是字符串，返回数组
    template.defaults.imports.stringToArray = function (str) {
        var arr = str.split('-')
        var newArr = []
        for (var i = arr[0]; i <= arr[1]; i++) {
            newArr.push(i)
        }
        return  newArr
    }
    pubObj.isLogin({
        url: '/cart/queryCart',
        type: 'get',
        data: null,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.length === 0) {
                $('.cartBody ul').append('<div style="margin-top:100px">还没有商品哦，快去挑选吧！</div>')
                return false
            }
            window.datas = data
            $('.cartBody ul').append(template('cartList', {dataArr:data}))
            //checkbox选定判断
            $('input').on('change', function () {
                if ($(this).hasClass('selectAll')) {
                    $('.cartBody ul input').prop('checked', this.checked)
                }
                var flag = (Array.from($('.mui-slider-handle input')).every(item => {
                    return $(item).prop('checked') === true
                }));
                if (flag) {
                    $('.selectAll').prop('checked','checked')
                } else {
                    $('.selectAll').prop('checked', false)
                }
                $('.priceCount .total').html(getPriceCount().toFixed(2))
            })
            //删除商品
            $('.cartBody ul').on('tap', '.deleteCart', function () {
                var productId = $(this).parent().parent().attr('id')
                var _this = this
                pubObj.isLogin({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: 'id=' + productId,
                    success: function (data) {
                        console.log(data);
                        if (data.success) {
                            $(_this).parent().parent().remove()
                        }
                    }
                })
            })

            //编辑商品
            $('.cartBody ul').on('tap', '.editCart', function () {
                var ele = $(this).parent().parent()
                var productId = ele.attr('id')
                var tempData = datas.filter(item => item.id === parseInt(productId) ? item : null)[0]
                var liEle = $('.cartBody ul li[id="'+productId+'"]')
                var size = liEle.find('.buySize').text()
                mui.confirm('','编辑商品',['确定','取消'], function(e) {
                    if (e.index === 0) {
                        console.log(1);
                        pubObj.isLogin({
                            url:'/cart/updateCart',
                            type:'post',
                            data: {
                                id:productId,
                                size: size,
                                num:mui('.kuCun .mui-numbox').numbox().getValue()
                            },
                            success:function (data) {
                                console.log(data);
                                if(data.success) {

                                    liEle.find('.buyCount').text(mui('.kuCun .mui-numbox').numbox().getValue())
                                    liEle.find('.buySize').text(size)
                                    mui.toast('修改成功')
                                }
                            }

                        })
                        //策划关闭
                        mui.swipeoutClose(ele.get(0));
                    }
                    else {
                        mui.swipeoutClose(ele.get(0));
                    }
                })
                $('.mui-popup-inner').append(template('edit', tempData))
                //选择尺码
                $('.mui-popup-inner .size').on('tap', 'ul li', function () {
                    $(this).addClass('selectFlag').siblings().removeClass('selectFlag')
                    size = $(this).text()
                })
                mui('.kuCun .mui-numbox').numbox().setValue(tempData.num)
                //商品购买量限制
                mui('.kuCun .mui-numbox').numbox().setOption('max',tempData.productNum)
            })
        }
    })
    //计算商品金额
    function getPriceCount() {
        var count = 0
        Array.from($('.cartBody li'))
            .map(item => {
                if($(item).find('.checkBox').prop('checked')) {
                    count += $(item).find('.priceNow').text() * $(item).find('.buyCount').text()
                }
            })
        return count
    }
// 解决mui nav下a标签不能跳转问题
    mui('nav').on('tap', 'a', function () {
        document.location.href = this.href;
    });
})