

const getAllCourses = async ()=>{
    let API = "https://us-central1-project-93bdb.cloudfunctions.net/api/availableCourses";

    // Must be added when done

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
            displayCourses(courses);

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}




window.onload =() => {
    getAllCourses();
} 



const displayCourses = (courses) => {

    console.log("lol");
    let class_name = ['moderate', 'danger', 'safe'];
    let x = 0;
    let userID = localStorage.getItem('userId')
    let html = "";


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


    for(let key in courses){

        if(courses[key].roster.students[userID]){
            continue;
        }
        html += `<tr class=${class_name[x++]}>
        <td>${courses[key].courseId}</td>
        <td>${courses[key].course_number}</td>
        <td>${courses[key].course_name}s</td>
        <td>${courses[key].main_ins.name}</td>
        <td>${Object.keys(courses[key].roster.students).length}</td>
        <td>${courses[key].meeting}</td>
        <td>${courses[key].semester}</td>
        <td>
            <button class="enrollBtn" onclick="sendRequest('${courses[key].courseId}','${courses[key].course_number}')" id="${courses[key].courseId}"'>Enroll</button>
        </td>
    </tr>`

    if(x==3)
    x=0;
    }

    courseTable.innerHTML += html;

}

function sendRequest (courseID, courseName) {

    

    let API_SEND = "https://us-central1-project-93bdb.cloudfunctions.net/api/sendCourseReq";
    let data = {
        courseID: courseID,
        courseREQ: courseName
        // We can get student ID from verify so delete studentID 
    }
    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)

    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data),
        contentType: "application/json",
        headers: myHeaders
    };

    fetch(API_SEND, requestOptions)
        .then(response => {

                return response.json()
            }
        )
        .then(res => {

            console.log(res);
        })
        .catch(error => console.log('error', error));
}