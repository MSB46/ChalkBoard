const getStudent = async ()=>{

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
               

                return response.json()
            }
        )
        .then(student => {
            console.log(student);
            if(student.error.code == "auth/id-token-expired")
            return window.location.href = "../../index.html";
            console.log(student);

            displayName(student);
            if (student.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}


const displayName = (student) => {
    document.querySelector('.student-name').textContent = `${student.firstname} ${student.lastname}`
    localStorage.setItem('userId', student.id);
}

window.onload =() => {
    getStudent();
} 
