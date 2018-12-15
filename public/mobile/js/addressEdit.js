$(function () {
// city选择
    $('.addressEditBody input[name="address"]').on('tap', function () {
        var _this = this
        var cityPicker = new mui.PopPicker({layer:3});
        cityPicker.setData(cityData3);
        cityPicker.show(function (selectItems) {
            var value = selectItems[0].text + ' ' + selectItems[1].text + ' ' + selectItems[2].text
            $(_this).val(value)
        })
    })
    if(location.search) {
        // update address
        console.log(1);
        var addrId = location.search.split('=')[1]
        $.ajax({
            url:'/address/queryAddress',
            type:'get',
            success: function (data) {
                console.log(data);
                var addrEditDeail = data.filter(item => {
                    return item.id === parseInt(addrId) ? item : null
                })[0]
                var ele = $('form')
                ele.find('input[name="recipients"]').val(addrEditDeail.recipients)
                ele.find('input[name="postcode"]').val(addrEditDeail.postCode)
                ele.find('input[name="address"]').val(addrEditDeail.address)
                ele.find('textarea[name="addressDetail"]').val(addrEditDeail.addressDetail)
            }
        })
        $('.addressEditBody .btn_submit').on('tap', function () {
            var params = valueConform()
            params.id = addrId
            console.log(params);
            pubObj.isLogin({
                url:'/address/updateAddress',
                type:'post',
                data:params,
                success: function (data) {
                    console.log(data);
                    if(data.success) {
                        location.href = 'address.html'
                    }
                }
            })
        })

        return false
    }

    //add address
    $('.addressEditBody .btn_submit').on('tap', function () {
        var params = valueConform()
        console.log(params);
        pubObj.isLogin({
            url:'/address/addAddress',
            type:'post',
            data:params,
            success: function (data) {
                console.log(data);
                if(data.success) {
                    location.href = 'address.html'
                }
            }
        })
    })
    function valueConform() {
        var params = pubObj.formDataToJson($('form').serialize())


        if (!params.recipients.trim()){
            mui.toast('请输入收件人')
            return false
        }

        if (!params.postcode.trim()){
            mui.toast('请输入邮编')
            return false
        }

        if (!params.address.trim()){
            mui.toast('请输入地址')
            return false
        }

        if (!params.address.trim()){
            mui.toast('请输入详细地址')
            return false
        }
        //中文处理
        for (var k in params) {
            params[k] = decodeURI(params[k])
        }
        console.log(params);
        return params
    }

})