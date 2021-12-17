




const getCourseRoster = async () => {

    let courseID = localStorage.getItem('courseId');
let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getInsCourse/${courseID}`;

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
            displayCourseRoster(courses);

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}

window.onload = () =>{
    getCourseRoster();
}


const displayCourseRoster = (course) => {


    let html1 = "";
    let html2 = "";
    // document.querySelector('.course-name').textContent = 
    let instructors = course.roster.instructors;
    let students = course.roster.students;
    for(let key in instructors){
        html1 += 
        `<tr>
        <td>${instructors[key]}</td>
        </tr>`
   
    }
    if(Object.keys(students).length != 1)
    for(let key in students){
        html2 += `
        <tr>
        <td>${students[key]}</td>
        </tr>`
    }
    document.querySelector('.instructors-roster').innerHTML = html1;
    document.querySelector('.students-roster').innerHTML = html2;

}
