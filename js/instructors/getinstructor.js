const getInstructor = async ()=>{

    let usertype = localStorage.getItem('user')
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/getUserInfo/${usertype}`;

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
               
                console.log(response.status);
                return response.json();
            }
        )
        .then(instructor => {
            
            console.log(instructor);

            displayName(instructor)
            if (instructor.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}

function displayName(instructor) {
    document.querySelector('.instructor-name').textContent = `${instructor.firstname} ${instructor.lastname}`
}



window.onload =() => {
    getInstructor();
} 

