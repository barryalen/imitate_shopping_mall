$(function () {
    $('.btn_updatePass').on('tap', function () {
        var data = pubObj.formDataToJson($('form').serialize())
        console.log(data);
        if (!data.oldPassword.trim()){
            mui.toast('请输入旧密码')
            return false
        }

        if (!data.newPassword.trim()){
            mui.toast('请输入新密码')
            return false
        }

        if (!data.reNewPassword.trim()){
            mui.toast('请输入确认密码')
            return false
        }

        pubObj.isLogin({
            url:'/user/updatePassword',
            type:'post',
            data:data,
            success:function (data) {
                console.log(data);
                if (data.errorCode === 1) {
                    mui.toast('原密码输入错误')
                    return false
                }
                if (data.errorCode === 2) {
                    mui.toast('新密码和确认密码不一致')
                    return false
                }

                if (data.success) {
                    location.href = 'user.html'
                }
            }
        })
    })
})