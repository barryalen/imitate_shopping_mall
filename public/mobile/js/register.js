$(function () {
    var timer = null
    //注册
    $('.btn_register').on('tap', function () {
        var data = pubObj.formDataToJson($('form').serialize())
        console.log(data);
        if (!data.mobile.trim()){
            mui.toast('请输入手机号')
            return false
        }

        if(!/^1\d{10}$/.test(data.mobile.trim())){
            mui.toast('请输入合法手机号');
            return false;
        }

        if (!data.pass.trim()){
            mui.toast('请输入密码')
            return false
        }

        if(!/^[0-9a-zA-Z_]{6,12}$/.test(data.pass.trim())){
            mui.toast('请输入合法密码');
            return false;
        }

        if (!data.rePass.trim()){
            mui.toast('请确认密码')
            return false
        }

        if(data.pass.trim() !== data.rePass.trim()){
            mui.toast('密码需要一致');
            return false;
        }
        if (!data.code.trim()){
            mui.toast('请输入验证码')
            return false
        }

        var params = {
            username:data.mobile,
            mobile:data.mobile,
            password:data.pass,
            vCode:data.code
         }
        $.ajax({
            url:'/user/register',
            type:'post',
            data: params,
            success: function (data) {
                console.log(data);
                if (data.success) {
                    location.href = 'login.html'
                }
            }
        })
    })
    // 获取验证码
    $('.btn_getCode').on('tap', function () {
        if (timer) {
            return false
        } else {
            $.ajax({
                url:'/user/vCode',
                type:'get',
                success: function (data) {
                    console.log(data);
                }
            })
            var _this = this
            var time = 59
            $(_this).addClass('disable').html(time+'s可重新获取')
            timer = setInterval(function () {
                time--
                $(_this).addClass('disable').html(time+'s可重新获取')
                if (time<=0) {
                    $(_this).removeClass('disable').html('获取验证码')
                    clearInterval(timer)
                }
            }, 1000)
        }

    })
})