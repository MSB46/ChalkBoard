
let usertype = localStorage.getItem('user');


let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getAllInstructors`;



const getAllInstructors = () => {
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
            // displayInstructors(courses);
            displayInstructors(courses);
        })
        .catch(error => { 
        console.log('error', error) 

        });
}

const setUserId=(id, email, name)=>{
    localStorage.setItem('userId', id);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name)
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id)
}

function displayInstructors(data){


    console.log(data);
    let html = "";
    for(let key in data){
    html += `<tr>
    <td>${data[key].id}</td>
    <td>${data[key].email}</td>
    <td><a href="./instructor-data.html" onclick="setUserId(${data[key].id})">${data[key].firstname} ${data[key].lastname}</a></td>
</tr>`
    }
  

    document.querySelector("#data-instructors").innerHTML = html;
    console.log(data);
}


window.onload = () => {
    getAllInstructors();

}


