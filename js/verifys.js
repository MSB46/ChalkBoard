

let API = 'https://us-central1-project-93bdb.cloudfunctions.net/api/verifyStudent'


const verifySession = () => {
    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      
      fetch(API, requestOptions)
        .then(response => {
         
          return response.json();
        })
        .then(student => {
          // This means that the user has no authorization to be on the /student.html page so reederict to homepage
            // console.log(result);
            if(student.error)
            return window.location.href = "../../index.html";
            // displayStudents(courses);
            console.log({Student: `${student.sucess}`});
        })
        .catch(error => { 
        console.log({error: 'Unexpected error'}) 

        });
}



window.onload = () => {
    // Quick verifier, it'll laster be changed and not neeeded since the verification 
    // will be implemented in every route that the student will user (POST or GET)
     verifySession();
}