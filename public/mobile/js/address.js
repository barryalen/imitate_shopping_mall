$(function () {
    pubObj.isLogin({
        url:'/address/queryAddress',
        type:'get',
        success: function (data) {
            console.log(data);
            $('.addressBody ul').append(template('addrList', {addr: data}))
            $('.addressBody').on('tap', '.mui-btn-red', function () {
                var ele = $(this).parent().parent()
                var addrId = ele.attr('id')
                console.log(addrId);
                pubObj.isLogin({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data:'id=' + addrId,
                    success: function (data) {
                        console.log(data);
                        ele.remove()
                    }
                })
            })
        }
    })
    $('.addressBody ').on('tap', '.mui-slider-handle', function () {
        location.href = 'addressEdit.html' + '?addressId=' + $(this).parent().attr('id')
    })
})