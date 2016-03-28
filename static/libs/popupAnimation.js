;(function($) {
    
    $(function(){
       $('#insertBlogButton').bind('click', function(event){
           popupForm(event, "#formularioBlog");
        });
    });
    
    $(function(){
       $('#confButton').bind('click', function(event){
           popupForm(event, "#formularioConfiguracion");
        });
    });
    
    $(function(){
       $('#crearBandaButton').bind('click', function(event){
           popupForm(event, "#formularioCrearBanda");
        });
    });
    
    
    function popupForm(event, formulario){
        event.preventDefault();
        $(formulario).bPopup({
            position: ['auto',120],
            speed: 450,
            transition: 'slideDown'
        });
    }

 })(jQuery);