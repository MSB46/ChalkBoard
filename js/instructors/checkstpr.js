




const getStuSaProgress = async () => {

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
            displayInsAs(courses);

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}

window.onload = () =>{
    getStuSaProgress();
}


const displayInsAs = (course) => {


    let html = "";

    let searchSaID = localStorage.getItem('saID')
    document.querySelector('.class-name').textContent = course.course_number;
    let assignments = course.s_assignments;
    console.log(Object.keys(assignments).length);
    let x = 1;
    if(Object.keys(assignments).length <= 0){
        return console.log("No assignments status to show");
    }
    for(let key in assignments){
        console.log(key);
        html += `
        <tr>
        <td>${course.roster.students[key]}</td>
        <td>${assignments[key][searchSaID].status}</td>
        <td><a href="./iview-assignment.html" onclick="setStuID('${key}', '${course.roster.students[key]}')">Check Assignment</a></td>
        `
        if(!assignments[key][searchSaID].grade)
        html +=`<td id="grade${x}">?</td>`
        else
        html +=`<td id="grade${x}">${assignments[key][searchSaID].grade}</td>`

        html += `<td><button id="${x}" type="button" class="btn btn-primary add" data-toggle="modal" data-target="#modalGrade"  onclick="setIDs('${course.courseId}', '${key}', '${searchSaID}')">Edit Grade</button></td>
        </tr>
       `
        x++;
    }

    document.querySelector('.students-progress').innerHTML = html;

}

function setIDs(courseID, stuID, saID) {
    localStorage.setItem('courseId', courseID);
    localStorage.setItem('stuID', stuID);
    localStorage.setItem('saID', saID);
}

async function submitGrade(e){
    e.preventDefault();

    let courseID = localStorage.getItem('courseId');
    let stuID = localStorage.getItem('stuID');
    let saID = localStorage.getItem('saID');
    let grade = document.querySelector('#grade-student').value;

    console.log(grade);
    if(grade<0 || grade > 100)
    return console.log("Input number between 0-100");
let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/saveGrade`;

    //  Must be added when done

    // Need to get the input of the grade the instructor will submit

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)



    let data = {
    courseID: courseID,
    stuID: stuID,
    saID: saID,
    grade: grade,
    }
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
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

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));
}



function setStuID(id, name){

    localStorage.setItem('stuName', name);
    console.log(id);
    localStorage.setItem('stuID', id);

}
