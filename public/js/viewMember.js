$(document).ready(function () {
  const url = window.location.href.split('/');
  const memberId = url[url.length - 1];
  var parentID;

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
    var data = $("#member-data").empty();

    $.get(`/api/children/${memberId}`)
    .then(response => {
      console.log(response);
      $("#member-name").text(response.fullName);
      var gender = $("<li>").text(`Gender: ${response.gender}`);
      var dob = $("<li>").text(`Date of Birth: ${new Date(response.dob).toDateString()}`);
      data.append(gender, dob);
      return $.get(`/api/household/${memberId}`);
    })
    .then(response => {
      console.log(response);
      parentID = response.id;
      if(response.parent2){
        data.append($("<li>").text(`Partner: ${response.parent2}`))
      }
      if(response.Children.length > 0){
        var children = $("<li>").text("Children: ");
        response.Children.forEach(child => {
          var childPageLink = $(`<a href= '/member/${child.id}'>`).text(`${child.fullName} `);
          children.append(childPageLink);
        });
        data.append(children);
      }
    })
    .catch(error => console.log(error));
  }

  // console.log(`view Member page is Ready, id: ${memberId}`);

  $("#child-submit-btn").on("click", event => {
    // Create body object to send with post request

    var newChild = {
      fullName: $("#child-name").val(),
      gender: $("input[name='gender']:checked").val(),
      dob: $("#child-dob").val(),
      ParentId: parentID
    };
    $.post("/api/children", newChild)
    .then(response => {
      console.log(`Adding to Child table: \n${response}`);
      var parentEntry = {
        parent1: $("#child-name").val(),
        parent1ID: response.id
      }
      return $.post("/api/parents", parentEntry)
    })
    .then(response => {
      console.log("Adding to Parent table: \n", response);
      showMember();
    })
    .catch(err => console.log(err));
  })

  $("#partner-submit-btn").on("click", event => {
    // Create body object to send with post request

    var newPartner = {
      parent2: $("#partner-name").val()
    };
    console.log(newPartner.parent2, memberId);

    $.ajax({
      url: `/api/parents/${memberId}`,
      type: 'PUT',
      data: newPartner
   })
    .then(response => {
      console.log(response);
      showMember();
    })
    .catch(err => console.log(err));
  })

  showMember();
});