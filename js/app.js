//Setting up the variables
let elements = []
var add = document.getElementById("add_button");
var row = document.getElementsByClassName("row");
let priority_button = document.getElementsByClassName("priority_button");
let complete_button = document.getElementsByClassName("complete_button");
let remove_button = document.getElementsByClassName("remove_button");
let list_item = document.getElementsByClassName("to_do")

let element_prioritize;
//Setting up the fucntions first



window.onload = function() {
  document.getElementById("table").onmouseover = startup;
}
//Creates the item after the user inputs a task. Using an array makes this easier to understand and organize
const create_item = function() {
  let input = document.getElementById("input_item").value;
  if (input === "") {
    alert("You must enter a task.")
  }
  else {
      let to_do = {
          task: input,
          priority: false,
          complete: false,
          html_row: null,
          html_priority_button: null,
          html_text: null,
          html_remove_button: null
      }
//The array
      elements.push(to_do);
      let index = elements.indexOf(to_do);

      elements[index].htmlRow = document.createElement("tr");
      elements[index].htmlRow.setAttribute("class", "row");
      document.getElementById("table").append(elements[index].htmlRow);

      elements[index].htmlPriorityButton = document.createElement("td");
      elements[index].htmlPriorityButton.setAttribute("class", "priority_button");
      elements[index].htmlPriorityButton.innerHTML = "!";

      row[index].append(elements[index].htmlPriorityButton);

      elements[index].htmlText = document.createElement("td");
      elements[index].htmlText.innerHTML = elements[index].task;
      elements[index].htmlText.setAttribute("class", "to_do");

      row[index].append(elements[index].htmlText);

      elements[index].htmlCompleteButton = document.createElement("td");
      elements[index].htmlCompleteButton.innerHTML = "&#x2713;";
      elements[index].htmlCompleteButton.setAttribute("class", "complete_button");

      row[index].append(elements[index].htmlCompleteButton);

      elements[index].htmlRemoveButton = document.createElement("td");
      elements[index].htmlRemoveButton.setAttribute("class", "remove_button");
      elements[index].htmlRemoveButton.innerHTML = "X";

      row[index].append(elements[index].htmlRemoveButton);
    }
    document.getElementById("input_item").value = "";
};
//This function removes a task which is done by reacting to if the remove button is clicked or not
const remove_item = function() {
  var removed = false;
  for (let i = 0; i < remove_button.length; i++) {
    remove_button[i].onclick = function() {
        removed = true;
        let remove_element = row[i];
        remove_element.remove();
        elements.splice(i, 1);
    };
    if (removed) {
        break;
    }
  }
}
//This checks off items that are completed. I did this by using a variable to decide if it was true or false. This also changed the background.
const finish_item = function() {

  var finish = false;

  for (let x = 0; x < complete_button.length; x++) {
    complete_button[x].onclick = function() {
       if (elements[x].complete == false) {

         finish = true;
         list_item[x].style.setProperty("text-decoration", "line-through");
         list_item[x].style.backgroundColor = "#baff66";
         complete_button[x].style.backgroundColor = "#baff66";
         elements[x].complete = true;
       }
       else if (elements[x].complete == true) {

         complete_button[x].style.backgroundColor = "white";
         list_item[x].style.setProperty("text-decoration", "none");
         list_item[x].style.backgroundColor = "white";
         elements[x].complete = false;
       }
     };
     if (finish) {
       break;
     }
  }
}
//Similar to the finished function this prioritizes items. I made sure to check so that the priority was set to the correct element.
const prioritize_item = function() {

  var prioritize = false;
  for (let z = 0; z < priority_button.length; z++) {

    priority_button[z].onclick = function () {
      if (elements[z].priority == false) {

        element_prioritize = row[z]
        prioritize = true;
        priority_button[z].style.backgroundColor = "yellow";
        row[0].before(element_prioritize);
        elements[z].priority = true;

        const objectToMove = elements[z];

        elements.splice(z, 1);
        elements.unshift(objectToMove);
        prioritize = true;
      }
      else if (elements[z].priority) {

        element_prioritize = row[z]
        priority_button[z].style.backgroundColor = "white";
        row[elements.length - 1].after(element_prioritize);
        elements[z].priority = false;

        let element_move = elements[z];
        elements.splice(z, 1);
        elements.push(element_move);
        prioritize = true;
      }
    };
    if (prioritize) {
      break;
    }
  }
}

const startup = function() {
  remove_item();
  finish_item();
  prioritize_item();
}

add.onclick = create_item

document.getElementById("input_item").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("add_button").click();
  }
});
