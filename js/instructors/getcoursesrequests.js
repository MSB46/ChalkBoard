// /getCourseReqs

const getAllCoursesRequests = async ()=>{

    let API = "https://us-central1-project-93bdb.cloudfunctions.net/api/getCourseReqs";

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
            displayCoursesRequests(courses);

            if (courses.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}




window.onload =() => {
    getAllCoursesRequests();
} 



const addStudent = async (ele, studentID, courseID, name) =>{


    let data = {
        userId: studentID,
        courseId: courseID,
        name: name
    }

    
    let API = "https://us-central1-project-93bdb.cloudfunctions.net/api/addStudent";

    // Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    await fetch(API, requestOptions)
        .then(response => {
                removeStudent(ele);
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

const removeStudent = (ele) => {

   ele.parentNode.remove();
   console.log("Denied request")


}



const displayCoursesRequests = (courses) => {
    console.log(courses);

    let x = 0;

    let html = "";
    for(let key in courses){
        console.log(key);
       let course_req = courses[key]
        for(let id in course_req){
            if(id === 'course_name')
            continue;
        html += `<div id="req${x}" class="student-request">
        <h2>Name: ${course_req[id]}</h2>
        <h2>Class requested: ${course_req['course_name']}</h2>
        <hr>
        <a onclick="addStudent(this, '${id}', '${key}', '${course_req[id]}')">Accept</a> <a onclick="removeStudent(this)">Deny</a>
    </div>`
        }
    }

    document.querySelector(".srequests-container").innerHTML = html;

}