let counter = 1;
function addQuestion(){
    let error = document.querySelector(".error");
    let questions = document.querySelector(".questions");
    if(counter >= 5){
        error.classList.remove("hide");
        return;
    }

    counter++;
    questions.innerHTML += (`
        <label for="desc-input${counter}" class="asking-for" id="q${counter}">Question ${counter}</label>
        <textarea class="cred-input" placeholder="Question ${counter}" name="desc-input${counter}" id="desc-input${counter}" rows="5" cols="80" required> </textarea>`);
}

function removeQuestion(){
    let error = document.querySelector(".error");
    if(counter <= 1){
        return;
    }
    error.classList.add("hide");
    let toBeRemoved = document.getElementById(`q${counter}`);
    toBeRemoved.remove();

    let toBeRemoved2 = document.getElementById(`desc-input${counter}`);
    toBeRemoved2.remove();
    counter--;
}