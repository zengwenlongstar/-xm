$(function() {
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            header: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                console.log(res);
            }
        })
    }
    getUserInfo()
})