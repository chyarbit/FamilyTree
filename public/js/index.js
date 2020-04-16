$(document).ready(function () {
  var hasTree = localStorage.getItem("hasTree");

  // date picker
  var date_input = $('input[name="date"]'); //our date input has the name "date"
  var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
  var options = {
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  // On page load, display the family tree if there is one. 
  function displayTree() {
    // Run get request to get the entire family tree
    $.ajax({
      url: '/api/family',
      method: "GET"
    })
      // After get request is successful, display the data in a tree format. 
      .then(response => {
        console.log(response);
      })

  }

  // when startButton is clicked, display form
  $("#startButton").on("click", function (event) {
    document.getElementById("startForm").style.display = "initial";
    // hide startbutton since form is displayed
    document.getElementById("startButton").style.display = "none";
  });

  // Create on click event for form submit button 
  $("#addButton").on("click", function (event) {
    event.preventDefault();
    var gender = $("input[name='gridRadios']:checked").val();

    var firstChild = [
      {
        fullName: $("#full-name").val(),
        gender: $("input[name='gridRadios']:checked").val(),
        dob: $("#dob").val(),
        ParentId: null
      }
    ]
    console.log(firstChild);
    var firstParent = [
      {
        parent1: $("#full-name").val(),
        parent2: $("#partner").val()
      }
    ];
    // Grab data from form and send post request to database
    // Post to both Parent and Child tables
    $.post("/api/children", firstChild)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))

    $.post("/api/parents", firstParent)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
    // Set local storage variable hasTree to true on successful post to database
    localStorage.setItem("hasTree", true);
    // Hide form and show user the tree
    document.getElementById("startForm").style.display = "none";
    displayTree();

  });
  // hide form and button when page loads if localstorage variable "hasTree" is true
  if (hasTree) {
    document.getElementById("startButton").style.display = "none";
    displayTree();
  }
});

    // // when button is clicked, set to true so index.html knows to remove the startFamily button when it is reloaded
    // $("#addButton").on("click", function(event){
    //   // use preventDefault to prevent form from reloading due to built in functionality
    //   event.preventDefault();
    //   localStorage.setItem("addButton", true);
    //   // get values from form and do an ajax call to the server to send the data back to the server
    // })
    // $("#viewFamilyButton").on("click", function(event){

    //   localStorage.setItem("viewFamilyButton", true)
    // })

