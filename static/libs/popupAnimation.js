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
       $('#passButton').bind('click', function(event){
           popupForm(event, "#formularioContraseña");
        });
    });
    
    $(function(){
       $('#crearBandaButton').bind('click', function(event){
           popupForm(event, "#formularioCrearBanda");
        });
    });
    
    $(function(){
       $('#writeButton').bind('click', function(event){
           popupForm(event, "#formularioRedactar");
        });
    });
    
    $(function(){
       $('#sendButton').bind('click', function(event){
           popupForm(event, "#formularioReenviar");
        });
    });
    
    $(function(){
       $('#answerButton').bind('click', function(event){
           popupForm(event, "#formularioResponder");
        });
    });
    
    $(function(){
       $('#entrarButton').bind('click', function(event){
           popupForm(event, "#formularioLogin");
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