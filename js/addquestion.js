let counter = 1;
function addQuestion(){
    let error = document.querySelector(".error");
    let question = document.querySelector(`#q${counter}`);
    if(counter >= 5){
        error.classList.remove("hide");
        return;
    }
    counter++;
    let html = `<label for="desc-input${counter}" class="asking-for" id="question${counter}">Question ${counter}</label>
    <textarea class="cred-input" placeholder="Question ${counter}" name="desc-input${counter}" id="q${counter}" rows="5" cols="80" required></textarea>`
    question.insertAdjacentHTML('afterend', html);
}

function removeQuestion(){
    let error = document.querySelector(".error");
    if(counter <= 1){
        return;
    }
    error.classList.add("hide");
    let toBeRemoved = document.getElementById(`question${counter}`);
    toBeRemoved.remove();

    let toBeRemoved2 = document.getElementById(`q${counter}`);
    toBeRemoved2.remove();
    counter--;
}