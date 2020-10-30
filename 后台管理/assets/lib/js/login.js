$(function() {
    $('#login-1').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#login-2').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            let pwd = $('#pss').val()
            console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }

    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name="password"]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！')
                $('#login-2').click()
            }
        })

    })

    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        let str = $(this).serialize()
        console.log(str);
        $.ajax({
                type: 'post',
                url: '/api/login',
                data: str,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('登陆失败')
                    }
                    layer.msg('登录成功！')
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            })
            // 判断用户是否按下了回车键,如果按下就把文本里面的值赋给span,效果从上
        $('#form_login').onkeyup = function(e) {
            if (e.keyCode === 13) {
                $('#btn').click()
            }
        }
    })

})