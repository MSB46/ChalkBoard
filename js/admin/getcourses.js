let usertype = localStorage.getItem('user');


let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getAllCourses`;


const getAllCourses = () => {
    let myHeaders = new Headers();
    let token = "Bearer " + localStorage.getItem('token');

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
            if (courses.error)
                return window.location.href = "../../index.html";
            // displayCourses(courses);
            displayCourses(courses);
        })
        .catch(error => {
            console.log('error', error)

        });
}

const setUserId = (id, type) => {
    localStorage.setItem('userId', id)
    localStorage.setItem('searchUser', type)
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id);
}

function displayCourses(data) {
    let courseTable = document.querySelector(".info");
    jQuery(function($){
        $(courseTable).footable({
            "columns": [
                { "name": "section", "title": "Section"},
                { "name": "classNum", "title": "Class Number", "breakpoints": "xs sm" },
                { "name": "className", "title": "Class Name", "breakpoints": "xs sm" },
                { "name": "instr", "title": "Instructor" },
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
            <th>Instructor</th>
            <th>Number of students</th>
            <th>Meeting Info</th>
            <th>Semester</th>
        </tr>
        </thead>
        `;

    let html = "";
    for (let key in data) {
        console.log(data[key].main_ins.email);
        html += `<tr><td>${data[key].courseId}</td>
    <td><a href="./course-data.html" class="test" onclick="setCourse(${data[key].courseId})">${data[key].course_number}</a></td>
    <td>${data[key].course_name}</td>
    <td><a href="./instructor-data.html" onclick="setUserId(${data[key].main_ins.instructor_id}, 'instructors')">${data[key].main_ins.name}</a></td>
    <td>${Object.keys(data[key].roster.students).length}</td>
    <td>${data[key].meeting}</td>
    <td>${data[key].semester}</td>
    </tr>`
    }

    courseTable.innerHTML += html;
    document.querySelector(".loadMessage").classList.add("hide");
    console.log(data);

}


window.onload = () => {
    getAllCourses();

}


