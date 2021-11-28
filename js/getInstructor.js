
window.onload =()=> {

    let API_INS = "https://us-central1-project-93bdb.cloudfunctions.net/api/getInstructors";
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
        .then(instructor => {
          // This means that the user has no authorization to be on the /student.html page so reederict to homepage
            // console.log(result);
            if(instructor.error)
            return window.location.href = "../../index.html";
            return console.log(instructor);;
            
        })
        .catch(error => { 
        console.log('error', error) 

        });
}


const logout=()=> {
    localStorage.setItem('token', null)
}