;(function($) {
    $(function() {
        $('#formButton').bind('click', function(e) {
            e.preventDefault();
            $('#FormularioBlog').bPopup({
                position: ['auto',120],
                speed: 450,
                transition: 'slideDown'
            });
        });
     });
 })(jQuery);
