

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


var index = 1;

const displayCourses = (courses) => {

    console.log("lol");
    let class_name = ['safe', 'moderate', 'danger'];
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
                { "name": "semester", "title": "Semester", "breakpoints": "xs sm" },
                { "name": "enroll", "title": "Enroll", "breakpoints": "xs sm" }
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
            <th>Enroll</th>
        </tr>
        </thead>
        `;
        html += `
        <tbody class="coursesEle">`
    for(let key in courses){

        if(courses[key].roster.students[userID] || courses[key].course_req[userID]){
            
            continue;
        }

        let rosterAmt = Object.keys(courses[key].roster.students).length;
        // Check if roster surpassed the number available to display a different color
        if(rosterAmt < 20) x = 0;
        else if(rosterAmt >= 21 && rosterAmt < 50) x = 1;
        else x = 2;

        html += `
        <tr class="${class_name[x]} courses${index}">
        <td>${courses[key].courseId}</td>
        <td>${courses[key].course_number}</td>
        <td>${courses[key].course_name}s</td>
        <td>${courses[key].main_ins.name}</td>
        <td>${Object.keys(courses[key].roster.students).length}</td>
        <td>${courses[key].meeting}</td>
        <td>${courses[key].semester}</td>
        <td>
            <button class="enrollBtn" onclick="sendRequest('${courses[key].courseId}','${courses[key].course_number}', 'courses${index}')" id="${courses[key].courseId}"'>Enroll</button>
        </td>
    </tr>
    `

    if(x==3)
    x=0;
    index++;
    }
    html += `</tbody>`
    courseTable.innerHTML += html;

}

async function sendRequest (courseID, courseName, ind) {
   
    index--;
    console.log(index);
    let tableRow = document.querySelector(`.${ind}`);
    console.log(tableRow);
    tableRow.style.display = 'none';
    console.log(typeof ind);
    if(index == 1)
    document.querySelector(".coursesEle").innerHTML = `<tr class="footable-empty"><td colspan="8">No results</td></tr>`
    // return console.log(ind);
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

    await fetch(API_SEND, requestOptions)
        .then(response => {

                return response.json()
            }
        )
        .then(res => {

            console.log(res);
        })
        .catch(error => console.log('error', error));
        alert(`Your request for course for course: ${courseName} has been sent`);


}