let usertype = localStorage.getItem('user');

let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getAllStudents`

const getAllStudents = () => {
    let myHeaders = new Headers();
    let token = "Bearer " + localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(API, requestOptions)
        .then(response => {
            // Change this is temporary
            console.log(response);

            return response.json();
        })
        .then(students => {
            // This means that the user has no authorization to be on the /student.html page so reederict to homepage
            // console.log(result);
            if (students.error)
                return window.location.href = "../../index.html";
            // displayStudents(courses);
            displayStudents(students);
        })
        .catch(error => {
            console.log('error', error)

        });
}

const setUserId = (id, user) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('searchUser', user)
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id)
}

function displayStudents(data) {
    let studentTable = document.querySelector(".student-info");

    jQuery(function ($) {
        $(studentTable).footable({
            "columns": [
                {"name": "id", "title": "ID"},
                {"name": "stuEmail", "title": "Email", "breakpoints": "xs sm md"},
                {"name": "stuName", "title": "Name"},
            ],
        });
    });


    studentTable.innerHTML +=
        `<thead>
        <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
        </thead>`;

    let html = "";
    for (let key in data) {
        console.log(data[key].student_id);
        html += `<tr><td>${data[key].id}</td>
    <td>${data[key].email}</td>
    <td><a href="./student-data.html" onclick="setUserId(${data[key].id}, '${data[key].usertype}')">${data[key].firstname} ${data[key].lastname}</a>
    </td></tr>`
    }


    studentTable.innerHTML += html;
    console.log(data);
}

window.onload = () => {
    getAllStudents();
}