
const addAssignment = (e) => {

    e.preventDefault();
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/addAssignment`;

    //  Must be added when done

    let as_name = document.querySelector('#assignment-name').value;
    let instructions = document.querySelector('#instructions-input').value;
    let due_date = document.querySelector('#due_date').value;
    let courseID = localStorage.getItem('courseId')
    let content = document.querySelectorAll('textarea')

    let questions = {};
    let errors = {};
    let x = 1;
    for(let index of content){
        questions[`q${x}`] = index.value
        if(index.value.length == 0)
        errors.error = `At least one question is empty, please remove it or fill it`;
        x++
    }
    console.log(errors);
    if(errors.error)
    return console.log(errors.error);
    // Gotta find a way to convert given date to seconds
    let data = {
    title: as_name,
    instructions: instructions,
    due_date: due_date,
    courseId: courseID,
    questions: questions
    }
    console.log(questions);
    // return console.log(data);

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    fetch(API, requestOptions)
        .then(response => {
               

                return response.json()
            }
        )
        .then(response => {
            // On success response, then redirect to courses
            if(response.error.code == "auth/id-token-expired")
            return window.location.href = "../../index.html";
            if(response.message)
            return window.location.href = 'icourses.html'

            if (response.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}




