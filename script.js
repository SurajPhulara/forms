// initial state of the form
var state = {
    form_title: "Untitled form",
    form_desc: "Form Discription",
    questions_array: [
        {
            questionStatement: "Untitled Question",
            questionType: "radio",
            options: [
                    "Option 1",
                    "Option 2",
                    "Option 3"
            ]
        },{
            questionStatement: "Untitled Question",
            questionType: "checkbox",
            options: [
                    "Option 1",
                    "Option 2",
                    "Option 3"
            ]
        },{
            questionStatement: "Untitled Question",
            questionType: "text",
        },
        {
          questionStatement: "Untitled Question",
          questionType: "range"
        },
        {
          questionStatement: "Untitled Question",
          questionType: "color"
        },
        {
          questionStatement: "Untitled Question",
          questionType: "date"
        },
        {
          questionStatement: "Untitled Question",
          questionType: "datetime-local"
        },
        {
          questionStatement: "Untitled Question",
          questionType: "file"
        },
        {
          questionStatement: "Untitled Question",
          questionType: "week"
        },
        {
          questionStatement: "Untitled Question",
          questionType: "time"
        },
    ]
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
    document.querySelector(".form__header_title").innerHTML = state.form_title;
    document.querySelector(".form__header_desc").innerHTML = state.form_desc;

    await document.querySelectorAll(".question_box").forEach((e) => {
        e.remove();
    })

    state.questions_array.forEach((e, i) => {
        var question_box = document.createElement("div")
        question_box.className = "question_box";
    
        var question = document.createElement("div")
        question.className = "question";
        if(e.questionStatement)
        question.innerHTML = e.questionStatement;
        question_box.appendChild(question)
    
        if(e.questionType == "radio" || e.questionType == "checkbox")
        {
            e.options.forEach((o)=>{
                var optionlist = document.createElement("div")
                optionlist.className="optionlist"
                var answer = document.createElement("input")
                answer.className = "radio_answer";
                answer.name=`question${i}`
                var label = document.createElement("label")
                label.className="label"
                label.innerHTML=o
                answer.type=e.questionType
                optionlist.appendChild(answer);
                optionlist.appendChild(label);
                question_box.appendChild(optionlist);
            })
        }
        else if (e.questionType == "submit")
        {
            var answer = document.createElement("input")
            // answer.className = "text_answer";
            answer.type =  e.questionType;
            question_box.appendChild(answer);
        }
        else {
            var answer = document.createElement("input")
            answer.className = "text_answer";
            answer.type =  e.questionType;
            question_box.appendChild(answer);
        }
    
        
        form.appendChild(question_box)
    })
    
}


document.querySelector("#model_input").innerHTML = JSON.stringify(state, null, 2);
create_view()
