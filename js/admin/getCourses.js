
let usertype = localStorage.getItem('user');


let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getAllCourses`;



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
            if(courses.error)
            return window.location.href = "../../index.html";
            // displayCourses(courses);
            displayCourses(courses);
        })
        .catch(error => { 
        console.log('error', error) 

        });
}

const setUserId=(id, type)=>{
    localStorage.setItem('userId', id)
    localStorage.setItem('searchUser', type)
}

const setCourse = (id) => {
  localStorage.setItem('courseId', id);
}

function displayCourses(data){

    let html = "";
    for(let key in data){
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
  

    document.getElementById('data-courses').innerHTML = html;
    console.log(data);
}


window.onload = () => {
    getAllCourses();

}


