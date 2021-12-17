
const getCourseAssignments =()=>{

    let usertype = localStorage.getItem('user');
    let courseID = localStorage.getItem('courseId');
let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getStuCourse/${usertype}&${courseID}`;

    //  Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    fetch(API, requestOptions)
        .then(response => {
            if(response.status == 403)
            return window.location.href = "../../index.html";
               

                return response.json()
            }
        )
        .then(courses => {
            console.log(courses);
            displayAssignments(courses);

            if (courses.error)
                return console.log(courses.error);
            
        })
        .catch(error => console.log('error', error));


}



window.onload =()=> {
    getCourseAssignments();
}


function displayAssignments(course) {

    let html = "";

    document.querySelector(".course-title").textContent = `${course.course_number} - Assignments`
    let x = 1;
    let assignments = course.s_assignments[localStorage.getItem('userId')]
    console.log(assignments);
    for(let key in assignments){
        html += `
        <div class="student-assignments">
        <h2>Assignment #: <span class="assignment-number">${x}</span></h2>
        <h2>Assignment title: ${assignments[key].title}</h2>
        <h2>Due date: <span class="due-date">${new Date(assignments[key].due_date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span></h2>
        <a href="./sactual-assignment.html" class="${x}" id="${key}" onclick="setSaID(event)">Start Now</a> 
       </div>`
       x++;
    }
    document.querySelector('.assignments-container').innerHTML = html;
}

function setSaID (e){
    console.log(e.target.id);
    console.log(e.target.className);
    let assignmentID = e.target.id;
    let classnum = e.target.className;
    localStorage.setItem('saID', assignmentID);
    localStorage.setItem('Sanum', classnum)
}

