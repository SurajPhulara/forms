// initial state of the form
var state = {
  "title": "signup form",
    "properties": {
    "firstName": {
      "type": "string",
        "title": "First name"
    },
    "lastName": {
      "type": "string",
        "title": "Last name"
    },
    "Email id": {
      "type": "string",
        "title": "Email id"
    },
    "Contact": {
      "type": "number",
        "title": "Phone Number"
    },
    "Password": {
      "type": "string",
        "title": "Password"
    }
  }
};

// function called when user submits form structure;
async function submitk() {
  state = await JSON.parse(document.querySelector("#model_input").value);
  document.querySelector("#model_input").innerHTML = await JSON.stringify(state, null, 2);
  await document.querySelectorAll(".question_box").forEach((e) => {
    e.remove();
  })
  await document.querySelectorAll(".form__header").forEach((e) => {
    e.remove();
  })
  create_view(state);
}

// generates and display view from state json
async function create_view(state) {

  var form = document.querySelector(".form_view")
    var form_header = document.createElement("div")
    form_header.className = "form__header";
    var form_title = document.createElement("div")
    form_title.className = "form__header_title";
    form_title.innerHTML = state.title;
    // if(state.description)
    // {
    // var form_description = document.createElement("div")
    // form_description.className = "form__header_desc";
    // }
    var form_description = document.createElement("div")
    form_description.className = "form__header_desc";
    form_description.innerHTML = (state.description)?state.description:" ";
    form_header.appendChild(form_title);
    form_header.appendChild(form_description);
    form.appendChild(form_header);

  Object.keys(state.properties).forEach((e, i) => {
    console.log(state.properties[e]);
    if(state.properties[e].type == "object")
    {
      create_view(state.properties[e]);
      return;
      // continue;
    }
    var question_box = document.createElement("div")
    question_box.className = "question_box";

    var question = document.createElement("div")
    question.className = "question";
    if (state.properties[e].title && state.properties[e].type != "object")
      question.innerHTML = state.properties[e].title;
    question_box.appendChild(question)

    if (state.properties[e].type == "string") {
      if (state.properties[e].format == "color") {
        var answer = document.createElement("input")
        answer.className = "text_answer";
        answer.type =  "color";
        question_box.appendChild(answer);
      }
      else if (state.properties[e].enum) {
        var answer = document.createElement("select")
        state.properties[e].enum.forEach((o, i)=>{
          var option = document.createElement("option")
          option.innerHTML = o;
          if(state.properties[e].default == o)
          option.selected = true;
          answer.appendChild(option)
        })
      }
      else {
        var answer = document.createElement("input")
        state.properties[e].type = "text";
      }
      answer.className = "text_answer";
      question_box.appendChild(answer);
    }
    else if (state.properties[e].type == "number") {
      var answer = document.createElement("input")
      answer.type = "number";
      answer.className = "text_answer";
      question_box.appendChild(answer);
    }
    else if(state.properties[e].type == "boolean")
    {
      var answer = document.createElement("input")
      answer.type = "checkbox";
      question_box.style.display = "flex"
      question_box.prepend(answer);
    }
    else{
          var answer = document.createElement("input")
          answer.className = "text_answer";
          answer.type =  state.properties[e].type;
          question_box.appendChild(answer);
      }

    if(state.properties[e].description)
    {
      var description = document.createElement("div")
      description.innerHTML = state.properties[e].description;
      description.className = "description";
      question_box.appendChild(description);
    }
    form.appendChild(question_box)
  })

}


document.querySelector("#model_input").innerHTML = JSON.stringify(state, null, 2);
create_view(state)
