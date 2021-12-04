
let courseId = localStorage.getItem('courseId');

console.log(courseId);

let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getSpecificCourse/admin&${courseId}`;



const getAllCourses = () => {
    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      
      fetch(API_INS, requestOptions)
        .then(response => {
            // Change this is temporary
         
          return response.json();
        })
        .then(courses => {
          // This means that the user has no authorization to be on the /student.html page so reederict to homepage
            // console.log(result);
            console.log(courses.error);
            if(courses.error)
            return window.location.href = "../../index.html";
            // displayCourses(courses);
            displayCourses(courses);
        })
        .catch(error => { 
        console.log('error', error) 

        });
}

const setUserId=(id, user)=>{
    localStorage.setItem('userId', id);
    localStorage.setItem('searchUser', user);
}


function displayCourses(data){

    document.querySelector('.section-title').textContent = `${data.course_number} | ${data.course_name}`

    let html = `<td>${data.courseId}</td>
    <td>${data.course_number}</td>
    <td>${data.course_name}</td>
    <td>${Object.keys(data.roster.students).length}</td>
    <td>${data.meeting}</td>
    <td>${data.semester}</td>`
    

    document.querySelector('#course-data-info').innerHTML = html;

    let ins = "";
    let stu = "";
        
    for(let key in data.roster.instructors){
    ins += `<tr>
    <td><a href="./instructor-data.html" onclick="setUserId(${key}, 'instructors')">${data.roster.instructors[key]} </a></td>
    <td>${key}</td>
</tr>`

    }
    
    if(data.roster.instructors)
    for(let key in data.roster.students){
        stu += ` <tr>
        <td><a href="./student-data.html" onclick="setUserId(${key}, 'students')">${data.roster.students[key]}</a></td>
        <td>${key}</td>
    </tr>
 `
        
    }
    document.querySelector('#ins-info-data').innerHTML = ins;
    document.querySelector('#stu-info-data').innerHTML = stu;
    console.log(data);
}


window.onload = () => {
    getAllCourses();

}
