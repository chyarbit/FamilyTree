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

  function showMember(){
    $.get(`/api/children/${memberId}`)
    .then(response => {
      console.log(response);
      $("#member-name").text(response.fullName);
    })
  }

  // console.log(`view Member page is Ready, id: ${memberId}`);

  $("#child-submit-btn").on("click", event => {
    
  })

  showMember();
});