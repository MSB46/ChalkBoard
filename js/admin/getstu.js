let user = localStorage.getItem('searchUser');
let id = localStorage.getItem('userId');
console.log(typeof id);
let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getUser/${id}&${user}`;

var myHeaders = new Headers();
let token = "Bearer " + localStorage.getItem('token');

myHeaders.append('Authorization', token)
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};


const getInsCourse = async  () => {


    await fetch(API_INS, requestOptions)
        .then(response => {
            // Change this is temporary
            return response.json();
        })
        .then(courses => {
            // This means that the user has no authorization to be on the /student.html page so reederict to homepage
            // console.log(result);
            if (courses.error)
                return window.location.href = "../../index.html";
            // displayStudent(courses);
            displayStudent(courses);
            displayCourses(courses);
        })
        .catch(error => {
            console.log(error)

        });
    console.log("hi after");


}

const setUserId = (id) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('searchUser', 'instructors');
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id);
}


function displayStudent(student) {
    let studentTable = document.querySelector(".student-info");

    jQuery(function ($) {
        $(studentTable).footable({
            "columns": [
                {"name": "id", "title": "ID"},
                {"name": "stuName", "title": "Name"},
                {"name": "stuEmail", "title": "Email", "breakpoints": "xs sm"},
            ],
        });
    });

    studentTable.innerHTML = `
        <thead>
        <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th data-breakpoints="xs sm">Email</th>
        </tr>
        </thead>`;

    console.log(student);
    let name = `${student.firstname} ${student.lastname}`;
    document.querySelector('.section-title').textContent = "Student: " +  name;

    let html = ` 
         <tr>
            <td>${student.id}</td>
            <td>${name}</td>
            <td>${student.email}</td>
        </tr>`
    studentTable.innerHTML += html;

}

async function displayCourses(student) {
    let name = `${student.firstname} ${student.lastname}`;
    let API_C = `https://us-central1-project-93bdb.cloudfunctions.net/api/getCourses/${student.id}&${student.usertype}&${name}`

    await fetch(API_C, requestOptions).then(data => {
        if (!data.ok)
            console.log("Message for users with no courses");
        return data.json();
    }).then(data => {
        console.log(data);
        if (data.error){
            return alert(`No courses to show for student: ${name}`)
        }
    

        let courseTable = document.querySelector(".course-info");

        jQuery(function ($) {
            $(courseTable).footable({
                "columns": [
                    {"name": "section", "title": "Section"},
                    {"name": "classNum", "title": "Class Number", "breakpoints": "xs sm"},
                    {"name": "className", "title": "Class Name", "breakpoints": "xs sm"},
                    {"name": "instr", "title": "Instructor"},
                    {"name": "studentAmt", "title": "Number of Students", "breakpoints": "xs sm", "filterable": "false"},
                    {"name": "meetInfo", "title": "Meeting Info", "breakpoints": "xs sm"},
                    {"name": "semester", "title": "Semester", "breakpoints": "xs sm"}
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
            <th>Instructor</th>
            <th>Number of students</th>
            <th>Meeting Info</th>
            <th>Semester</th>
        </tr>
        </thead>
        `;


        let html = "";
        for (let key in data) {
            html += `<tr><td>${data[key].courseId}</td>
    <td><a href="./course-data.html" class="test" onclick="setCourse(${data[key].courseId})">${data[key].course_number}</a></td>
    <td>${data[key].course_name}</td>
    <td><a href="./student-data.html" onclick="setUserId(${data[key].main_ins.instructor_id})">${data[key].main_ins.name}</a></td>
    <td>${Object.keys(data[key].roster.students).length}</td>
    <td>${data[key].meeting}</td>
    <td>${data[key].semester}</td>
    </tr>`
        }
        courseTable.innerHTML += html;

    })


}


window.onload = () => {
    getInsCourse();

}


