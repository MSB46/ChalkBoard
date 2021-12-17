


const getRelatedCourses = () => {

    let usertype = localStorage.getItem('user');
let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getStuCourses/${usertype}`;

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
            displayCourses(courses);

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}

window.onload = () =>{
    getRelatedCourses();
}


const displayCourses = (courses) => {

    let html = "";

    for(let key in courses){
        html += `
    <div class="courses">
        <h2><span class="subject">${courses[key].course_number}</span></h2>
        <h2>Instructors's Name: <span class="teacher-name">${courses[key].main_ins.name}</span></h2>
        <h2>Class time: <span class="class-time">${courses[key].meeting}</span></h2>
        <a href="./sassignments.html" id="${courses[key].courseId}" onclick="setID(event)">See assignments</a>
    </div>`
    }

    document.querySelector('.scourses-container').innerHTML = html;

}

function setID(e){

    let courseID = e.target.id;

    localStorage.setItem('courseId', courseID);


}