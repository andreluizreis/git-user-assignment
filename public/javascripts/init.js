(function($){
  $(function(){

    $('.button-collapse').sideNav();

      var currentColumn = 0;

    function countColumn(){
        if(currentColumn == 3){
            currentColumn = 0;
        } else {
            currentColumn += 1;
        }
        return currentColumn;
    }

  }); // end of document ready
})(jQuery); // end of jQuery name space