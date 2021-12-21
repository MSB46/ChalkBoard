




const getSingleStuAssignment = async () => {

    let userID = localStorage.getItem('userId');
    let courseID = localStorage.getItem('courseId');
    let saID = localStorage.getItem('saID');
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getSaI/${userID}&${courseID}&${saID}`;

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
                return console.log(courses.error);
            
        })
        .catch(error => console.log('error', error));

}

window.onload = () =>{
    getSingleStuAssignment();
}


const displayInsAs = (assignment) => {

    console.log(assignment);
    let html = "";


    let assignmentnum = localStorage.getItem('Sanum');
    let studentName = localStorage.getItem('stuName')

    let dateWithouthSecond = new Date(assignment.due_date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    

    document.querySelector('#assignment-number').textContent = assignmentnum;
    document.querySelector('#student-name').textContent = studentName;
    document.querySelector('#sa-title').textContent = assignment.title;
    document.querySelector('#instructions').textContent = assignment.instructions;
    document.querySelector('#due-date').textContent = dateWithouthSecond;


    let questions = assignment.questions;
    console.log(questions);
    let x = 1;
    for(let key in questions){
        html += `<h2 class=${key}>Question: ${questions[key]}</h2>`;
        if(assignment.answers){
            html += `<textarea name="${key}" id="answer${x}" cols="30" rows="4" disabled>${assignment.answers[key]}</textarea> <br> <br>`;
            continue;
        }
        html += `<textarea name="${key}" id="answer${x}" cols="30" rows="4" disabled></textarea> <br> <br>`;
        
    }

    console.log(assignment.uploads);
    if(assignment.uploads){
        html += 
            `<h2>Student uploads:</h2>
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


function setSaID(id){

    console.log(id);
    localStorage.setItem('saID', id);


}