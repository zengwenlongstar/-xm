$(function() {

    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('请求失败')
            }
            renDer(res.data)
            console.log(res);
        }
    })
}




function renDer(user) {
    let use = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + use)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avattar').hide()
    } else {
        $('.layui-nav-img').hide()
        let fistr = use[0].toUpperCase()
        console.log(fistr);
        $('.text-avattar').html(fistr).show()
    }
}

$('#btn').on('click', function() {

    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
    });
})