$(function () {
    pubObj.isLogin({
        url:'/user/queryUserMessage',
        type:'get',
        success: function (data) {
            console.log(data);
            if (data.username.trim()) {
                $('.mui-media-body').html(data.username+
                    '<p class="mui-ellipsis">'+data.mobile+'</p>')
            }
        }
    })
    $('.out_login').on('tap', function () {
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function (data) {
                console.log(data);
                location.href = pubObj.loginUrl
            }
        })
    })
    // 解决mui nav下a标签不能跳转问题
    mui('nav').on('tap', 'a', function () {
        document.location.href = this.href;
    });
})