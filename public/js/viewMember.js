$(document).ready(function () {
  const url = window.location.href.split('/');
  const memberId = url[url.length - 1];

  var date_input = $('input[name="date"]'); //our date input has the name "date"
  var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
  var options = {
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);
  console.log(`view Member page is Ready, id: ${memberId}`);

  $("#child-submit-btn").on("click", event => {
    
  })

});