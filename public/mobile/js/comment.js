window.pubObj = {}
/**
 * 获取搜索关键字
 * param location.search
 */
pubObj.getDataURL = function (url) {
    if (url) {
        var arr = url.split('=')
        if (arr.length > 1) {
            // 多个搜索条件
            return arr[1].split('%20').map(item => decodeURI(item)).join(' ')
        } else {
            return decodeURI(arr[1])
        }
    }
    return null
}

/**
 * 表单数据转换json
 */
pubObj.formDataToJson = function (str) {
    var json = {}
    str.split('&').map(item => {
        var key = item.split('=')[0]
        var value = item.split('=')[1]
        json[key] = value
    })
    return json
}

pubObj.loginUrl = '/mobile/login.html'
pubObj.cartUrl = '/mobile/user/cart.html'
pubObj.isLogin = function (params) {
    $.ajax({
        url: params.url || '/',
        type: params.type || 'get',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success: function (data) {
            var returnUrl = params.href || location.href
            if (data.error === 400) {
                //if (false) {
                location.href = pubObj.loginUrl + '?returnUrl=' + returnUrl
                return false
            } else {
                params.success && params.success(data)
            }

        },
        error: function (data) {
            console.log(data);
            mui.toast('服务器忙')
        }
    })
}

