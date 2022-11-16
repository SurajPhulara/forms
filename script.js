// initial state of the form
var state = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "number",
      "title": "Age",
      "description":"enter your age here"
    },
    "dropdown":{
      "type": "string",
      "title": "select",
      "enum": ["option 1", "option 2", "option 3", "option 4"],
      "default": "option 1"
    },
    "telephone": {
      "type": "string",
      "title": "Telephone"
    },
    "boolean": {
      "type": "boolean",
      "title": "remember me"
    }
  }
};

// function called when user submits form structure;
async function submitk() {
  state = await JSON.parse(document.querySelector("#model_input").value);
  document.querySelector("#model_input").innerHTML = await JSON.stringify(state, null, 2);
  create_view();
}

// generates and display view from state json
async function create_view() {

  var form = document.querySelector(".form_view")
  document.querySelector(".form__header_title").innerHTML = state.title;
  document.querySelector(".form__header_desc").innerHTML = (state.description)?state.description:" ";

  await document.querySelectorAll(".question_box").forEach((e) => {
    e.remove();
  })

  Object.keys(state.properties).forEach((e, i) => {
    console.log(state.properties[e]);
    var question_box = document.createElement("div")
    question_box.className = "question_box";

    var question = document.createElement("div")
    question.className = "question";
    if (state.properties[e].title)
      question.innerHTML = state.properties[e].title;
    question_box.appendChild(question)

    // if(e.questionType == "radio" || e.questionType == "checkbox")
    // {
    //     e.options.forEach((o)=>{
    //         var optionlist = document.createElement("div")
    //         optionlist.className="optionlist"
    //         var answer = document.createElement("input")
    //         answer.className = "radio_answer";
    //         answer.name=`question${i}`
    //         var label = document.createElement("label")
    //         label.className="label"
    //         label.innerHTML=o
    //         answer.type=e.questionType
    //         optionlist.appendChild(answer);
    //         optionlist.appendChild(label);
    //         question_box.appendChild(optionlist);
    //     })
    // }
    // else {
    //     var answer = document.createElement("input")
    //     if(e.questionType != "submit")
    //     answer.className = "text_answer";
    //     answer.type =  e.questionType;
    //     question_box.appendChild(answer);
    // }

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

    // if(state.properties[e].type == "object")
    // {

    // }

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
create_view()
