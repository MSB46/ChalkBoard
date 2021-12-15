




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
    // document.querySelector('.course-name').textContent = 
    let assignments = course.s_assignments;
    for(let key in assignments){
        console.log(key);
        html += `
        <tr>
        <td>${course.roster.students[key]}</td>
        <td>${assignments[key][searchSaID].status}</td>
        <td><a href="./iview-assignment.html" onclick="setStuID('${key}', '${course.roster.students[key]}')">Check Assignment</a></td>
        <td>?</td>
        <td><a href="#">Edit Grade</a></td>
        </tr>
       `
   
    }

    document.querySelector('.students-progress').innerHTML = html;

}


function setStuID(id, name){

    localStorage.setItem('stuName', name);
    console.log(id);
    localStorage.setItem('userId', id);


}