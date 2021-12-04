
let user = localStorage.getItem('searchUser');
let id = localStorage.getItem('userId');
console.log(typeof id);
let API_INS = `https://us-central1-project-93bdb.cloudfunctions.net/api/getUser/${id}&${user}`;

var myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };


const getInsCourse= () => {
    
      
      fetch(API_INS, requestOptions)
        .then(response => {
            // Change this is temporary
          return response.json();
        })
        .then(courses => {
          // This means that the user has no authorization to be on the /student.html page so reederict to homepage
            // console.log(result);
            // if(courses.error)
            // return window.location.href = "../../index.html";
            // displaystudent(courses);
            displaystudent(courses);
            displayCourses(courses);
        })
        .catch(error => { 
        console.log('error', error) 

        });
        console.log("hi after");




        
}

const setUserId =(id)=>{
    localStorage.setItem('userId', id)
}

const setCourse = (id) => {
    localStorage.setItem('courseId', id);
}




function displaystudent(student){

    console.log(student);
    let name = `${student.firstname} ${student.lastname}`;
    document.querySelector('.section-title').textContent = name;

    let html = ` <tr>
    <td>${student.id}</td>
    <td>${name}</td>
    <td>${student.email}</td>
</tr>`
    document.querySelector('#stu-info-data').innerHTML = html;

}

function displayCourses (student) {

    let name = `${student.firstname} ${student.lastname}`;
let API_C = `https://us-central1-project-93bdb.cloudfun
ctions.net/api/getCourses/${student.id}&${student.usertype}&${name}`

fetch(API_C, requestOptions).then(data=>{
    if(!data.ok)
    console.log("Message for users with no courses");
    return data.json();
}).then(data=>{
    if(data.error)
    return console.log({error: data.error});
    let html  = "";
    for(let key in data){
     html += `<tr><td>${data[key].courseId}</td>
    <td><a href="./course-data.html" class="test" onclick="setCourse(${data[key].courseId})">${data[key].course_number}</a></td>
    <td>${data[key].course_name}</td>
    <td><a href="./student-data.html" onclick="setUserId(${data[key].main_ins.student_id})">${data[key].main_ins.name}</a></td>
    <td>${data[key].meeting}</td>
    <td>${data[key].semester}</td>
    </tr>`
    }
    document.querySelector('#stu-courses').innerHTML = html;

})


}




window.onload = () => {
    getInsCourse();

}


