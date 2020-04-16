$(document).ready(function() {
    // hide form when page loads
    // document.getElementById("startForm").style.display = "none";
    // date picker
      var date_input=$('input[name="date"]'); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
    
    // when startButton is clicked, display form
    $("#startButton").on("click", function(event){
    document.getElementById("startForm").style.display = "initial";
    // hide button
    document.getElementById("startButton").style.display = "none";
  });
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

