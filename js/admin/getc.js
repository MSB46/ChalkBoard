
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
    let courseTable = document.querySelector(".courseInfo");

    jQuery(function($){
        $(courseTable).footable({
            "columns": [
                { "name": "section", "title": "Section"},
                { "name": "classNum", "title": "Class Number" },
                { "name": "className", "title": "Class Name", "breakpoints": "xs sm" },
                { "name": "studentAmt", "title": "Number of Students", "breakpoints": "xs sm", "filterable": "false"},
                { "name": "meetInfo", "title": "Meeting Info", "breakpoints": "xs sm" },
                { "name": "semester", "title": "Semester", "breakpoints": "xs sm" }
            ],
        });
    });
    // Allows the tables to convert to vertical layout on mobile devices

    courseTable.innerHTML += `        
        <thead>
        <tr>
            <th>Section</th>
            <th>Class Number</th>
            <th>Class Name</th>
            <th>Number of students</th>
            <th>Meeting Info</th>
            <th>Semester</th>
        </tr>
        </thead>
        `;


    document.querySelector('.section-title').textContent = `${data.course_number} | ${data.course_name}`

    let html = `<tr><td>${data.courseId}</td>
    <td>${data.course_number}</td>
    <td>${data.course_name}</td>
    <td>${Object.keys(data.roster.students).length}</td>
    <td>${data.meeting}</td>
    <td>${data.semester}</td></tr>`
    

    courseTable.innerHTML += html;

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
