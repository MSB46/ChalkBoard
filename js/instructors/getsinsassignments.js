




const getInsAssignments = async () => {

    let courseID = localStorage.getItem('courseId');
let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getInsAssignments/${courseID}`;

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
    getInsAssignments();
}


const displayInsAs = (assignment) => {

    let html = "";

    document.querySelector('.course-name').textContent = localStorage.getItem('courseName');
    let x = 1;
    for(let key in assignment){
        console.log(key);
        html += `
        <div class="student-assignments">
         <h2>Assignment #: ${x}</h2>
         <h2>Assignment title: ${assignment[key].title}</h2>
         <h2>Due date: ${new Date(assignment[key].due_date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</h2>
         <h2><a href="./iassignments-status.html" onclick="setSaID('${key}')">Check students progress</a></h2>
        <h2><a href="./instructor-saview.html" onclick="setSaID('${key}')">More info about this assignment</a></h2>
      </div>`;
      x++;
    }

    document.querySelector('.student-container').innerHTML = html;

}


function setSaID(id){

    console.log(id);
    localStorage.setItem('saID', id);


}