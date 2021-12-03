
let usertype = localStorage.getItem('user');

console.log(usertype);

let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getAllCourses/${usertype}`;



const getInsCourse= () => {
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
            // displayInsCourse(courses);
            displayInsCourse(courses);
        })
        .catch(error => { 
        console.log('error', error) 

        });
}

const setUserId=(id)=>{
    localStorage.setItem('userId', id)
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id)
}

function displayInsCourse(data){

    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email');
    let html1 = `<tr><td>${userId}</td>
    <td>${email}</td></tr>`;
    
  
    document.querySelector('#ins-info-data').innerHTML = html1;

    console.log(data);
    return;
}


window.onload = () => {
    getInsCourse();

}


