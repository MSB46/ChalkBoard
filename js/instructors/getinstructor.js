const getInstructor =()=>{

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

    fetch(API, requestOptions)
        .then(response => {
               

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




window.onload =() => {
    getInstructor();
} 
