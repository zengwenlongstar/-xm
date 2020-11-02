$(function() {
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
})