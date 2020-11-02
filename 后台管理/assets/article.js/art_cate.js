$(function() {
    let layer = layui.layer
    let form = layui.form;
    initArtCateLis()

    function initArtCateLis() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                let rgb = template('tpl-table', res)
                $('tbody').html(rgb)
            }
        })
    }
    var open = null;
    $('#btnAddCate').on('click', function() {
        open = layer.open({
            type: 1,
            anim: 2,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#boxAddCate', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章列表失败')
                }
                initArtCateLis()
                layer.msg('添加文章列表成功')
                layer.close(open)
            }
        })
    })




    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            anim: 2,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })


    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('编辑文章列表失败')
                }
                layer.msg('编辑文章列表成功')
                layer.close(indexEdit)
                initArtCateLis()
            }
        })
    })


    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除列表失败')
                    }
                    layer.msg('删除列表成功')
                    layer.close(index)
                    initArtCateLis()
                }
            })
        })
    })
})