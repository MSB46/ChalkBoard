




const getSingleStuAssignment = async () => {

    let courseID = localStorage.getItem('courseId');
    let saID = localStorage.getItem('saID');
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getSaI/${courseID}&${saID}`;

    //  Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

   await fetch(API, requestOptions)
        .then(response => {
            if(response.status == 403)
            return window.location.href = "../../index.html";
               

                return response.json()
            }
        )
        .then(courses => {
            console.log(courses);
            displayInsAs(courses);

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}

window.onload = () =>{
    getSingleStuAssignment();
}


const displayInsAs = (assignment) => {

    let html = "";


    let assignmentnum = localStorage.getItem('Sanum');

    let dateWithouthSecond = new Date(assignment.due_date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    

    document.querySelector('#assignment-number').textContent = assignmentnum;
    document.querySelector('#student-name').textContent = "Instructor View";
    document.querySelector('#sa-title').textContent = assignment.title;
    document.querySelector('#instructions').textContent = assignment.instructions;
    document.querySelector('#due-date').textContent = dateWithouthSecond;


    let questions = assignment.questions;
    console.log(questions);
    let x = 1;
    for(let key in questions){
        html += `<h2 class=${key}>Question: ${questions[key]}</h2>`;
        if(assignment.answers){
            html += `<textarea name="${key}" id="answer${x}" cols="30" rows="4">${assignment.answers[key]}</textarea> <br> <br>`;
            continue;
        }
        html += `<textarea name="${key}" id="answer${x}" cols="30" rows="4"></textarea> <br> <br>`;
        
    }

    console.log(assignment.uploads);
    if(assignment.uploads){
        html += 
            `<h2>Instructor uploads (Material Related to Assignment):</h2>
            <ul>`
        let uploads = assignment.uploads
        for(let key in uploads){
            console.log(key);
            html += `<li><a href="${uploads[key].link}" download>${uploads[key].name}</a></li>`
                            
        }
        html += `</ul>`
    }
    document.querySelector('.q-content').innerHTML = html;


}

const saveDraft = async (e)=>{

    let answers = document.querySelectorAll("textarea");

    let textAreaAns = {};
    let errors = {};
    let x = 1;
    for(let key of answers){
        textAreaAns[`q${x}`] = key.value;
        console.log(key.value);
        if(key.value.length == 0)
        errors.error = `At least one question is empty, don't save it empty`;
        x++
    }

    console.log(errors);
    if(errors.error)
    return console.log(errors.error);
    // return;
    let courseID = localStorage.getItem('courseId');
    let assignmentID = localStorage.getItem('saID');
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/saveDraftI`


    let data = {
        courseID: courseID,
        assignmentID: assignmentID,
        answers: textAreaAns

    };

    if(e.target.id == "submit-assignment"){
        data.s = "approved"
    }
    
    // return console.log(data.answers);
    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');


    myHeaders.append('Authorization', token)
    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: myHeaders,
    };

    await fetch(API, requestOptions)
        .then(response => {
               if(response.status == 403)
               return window.location.href = "../../index.html";

                return response.json()
            }
        )
        .then(response => {
            console.log(response);

            if (response.error)
                return console.log(response.error);
            
        })
        .catch(error => console.log('error', error));


let files= document.getElementById('files').files


        if(files.length > 5 || files.length == 0)
        return console.log("No files to upload, or too many files (5 files at most)");
        else
        upload();
    
}
async function upload(){

    // e.preventDefault();

let courseID = localStorage.getItem('courseId');
let assignmentID = localStorage.getItem('saID');
let files= document.getElementById('files').files
let myHeaders = new Headers();
let token = "Bearer "+localStorage.getItem('token');


myHeaders.append('Authorization', token)
let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/uploadI/${courseID}&${assignmentID}`;


    console.log(files);

for (let i = 0; i < files.length; i++) {
    var fd = new FormData()
  fd.append(i, files[i])
  console.log(fd);

  var newrequestOptions = {
    method: 'POST',
    body: fd,
    redirect: 'follow',
    headers: myHeaders
  };
  await fetch(API, newrequestOptions)
    .then(data=>{
        return data.json();
    })
    .then(data=>{
        console.log(data);
    })
}
}
