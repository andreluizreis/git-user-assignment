(function($){
  $(function(){

    $('.button-collapse').sideNav();

      $('#closeBtn').click(function() {
          $('#search').val('');
      });

  }); // end of document ready
})(jQuery); // end of jQuery name space