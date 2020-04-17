$(document).ready(function () {
  var hasTree = localStorage.getItem("hasTree");
  var create = go.GraphObject.make;

  // date picker
  var date_input = $('input[name="date"]'); //our date input has the name "date"
  var container =
    $(".bootstrap-iso form").length > 0
      ? $(".bootstrap-iso form").parent()
      : "body";
  var options = {
    format: "mm/dd/yyyy",
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  // define Converters to be used for Bindings
  function genderBrushConverter(gender) {
    if (gender === "male") return "blue";
    if (gender === "female") return "pink";
    return "orange";
  }
  // On page load, display the family tree if there is one.
  function displayTree() {
    // Run get request to get the entire family tree
    $.ajax({
      url: "/api/family",
      method: "GET",
    })
      // After get request is successful, display the data in a tree format.
      .then((response) => {
        console.log(response);
        var familyArray = [];

        //console.log(response[0].fullName)
        // After get request is successful, display the data in a tree format.
        // create a for loop to iterate through the array
        for (var i = 0; i < response.length; i++) {
          // get each person in household
          var person = response[i];
          console.log(person);
          // hold the fullName data from the response
          // var fullName = $(`<a href= '/member/${person.id}'>`).text(person.fullName).addClass("family-fullName row")
          // append
          // $("#familyInfo").append(fullName)
          var familyMember = {
            name: person.fullName,
            key: person.id,
            gender: person.gender,
          };
          if (person.Parent) {
            familyMember.parent = person.Parent.parent1ID;
            console.log(person.Parent);
          }
          familyArray.push(familyMember);
        }

        var familyTree = create(go.Diagram, "familyTreeContainer", 
        {
          allowCopy: false,
            layout:  // create a TreeLayout for the family tree
              create(go.TreeLayout,
                { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
        });

        familyTree.nodeTemplate = create(
          go.Node,
          "Auto",
          { deletable: false},
          new go.Binding("text", "name"),
          create(
            go.Shape,
            "Rectangle",
            {
              fill: "lightgray",
              stroke: null,
              strokeWidth: 0,
              stretch: go.GraphObject.Fill,
              alignment: go.Spot.Center,
            },
            new go.Binding("fill", "gender", genderBrushConverter)
          ),
          // create(go.TextBlock,
          //   {
          //     font: "700 12px Droid Serif, sans-serif",
          //     textAlign: "center",
          //     margin: 10, maxSize: new go.Size(80, NaN)
          //   },
          //   new go.Binding("text", "name"))
          create("HyperlinkText",
          function(node) { return "/member/" + node.data.key; },
          function(node) { return node.data.name; },
          { margin: 10 }
          )
        );

        // define the Link template
        familyTree.linkTemplate = create(
          go.Link, // the whole link panel
          { routing: go.Link.Orthogonal, corner: 5, selectable: false },
          create(go.Shape, { strokeWidth: 3, stroke: "#424242" })
        ); // the gray link shape
        // create(go.Node, "Horizontal",
        // {
        //   background: "gray"
        // },
        //   create(go.TextBlock, "Default Text",
        //   {
        //     margin: 12,
        //     stroke: "white",
        //     font: "bold 16px sans-serif"
        //   },
        //   new go.Binding("text", "name"))
        // );
        var treeModel = create(go.TreeModel);
        treeModel.nodeDataArray = familyArray;
        console.log("TreeArray: ", treeModel.nodeDataArray);
        familyTree.model = treeModel;
      });
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

    var firstChild = {
      fullName: $("#full-name").val(),
      gender: $("input[name='gridRadios']:checked").val(),
      dob: $("#dob").val(),
    };
    var firstParent = {
      parent1: $("#full-name").val(),
      parent2: $("#partner").val(),
    };
    // Grab data from form and send post request to database
    // Post to both Parent and Child tables
    $.post("/api/children", firstChild)
      .then((response) => {
        console.log(response);

        firstParent.parent1ID = response.id;
        return $.post("/api/parents", firstParent);
      })
      .then((response) => {
        console.log(response);
        // Set local storage variable hasTree to true on successful post to database
        localStorage.setItem("hasTree", true);
      })
      .catch((error) => console.log(error));

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
