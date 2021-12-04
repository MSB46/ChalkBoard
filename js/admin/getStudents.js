
let usertype = localStorage.getItem('user');

let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getAllStudents`

const getAllStudents = () => {
    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

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
            if(students.error)
            return window.location.href = "../../index.html";
            // displayStudents(courses);
            displayStudents(students);
        })
        .catch(error => { 
        console.log('error', error) 

        });
}

const setUserId=(id, email, name)=>{
    localStorage.setItem('userId', id);
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id)
}

function displayStudents(data){
    let html = "";
    for(let key in data){
        console.log(data[key].student_id);
    html += `<tr><td>${data[key].id}</td>
    <td>${data[key].email}</td>
    <td><a href="./student-data.html" onclick="setUserId(${data[key].id})">${data[key].firstname} ${data[key].lastname}</a>
    </td></tr>`
    }
  

    document.querySelector("#data-students").innerHTML = html;
    console.log(data);
}

window.onload = () => {
    getAllStudents();
}