$(function () {
    $('#login').on('tap', function () {
        var data = pubObj.formDataToJson($('form').serialize())
        $.ajax({
            url:'/user/login',
            type:'post',
            data: data,
            success: function (data) {
                if (data.error === 403) {
                    mui.toast('用户名或密码错误',{type:'div'})
                    return false
                }
                if (data.success) {
                    // console.log(location.search);
                    //console.log(location.href.split('returnUrl')[1].slice(1));
                    if (location.search === '') {
                        location.href = 'user/user.html'
                        return false
                    }
                    location.href = location.search.replace('?returnUrl=','')
                }
            }
        })
    })
})