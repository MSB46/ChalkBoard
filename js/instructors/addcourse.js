
const addCourse = (e) => {

    e.preventDefault();
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/addCourse`;

    //  Must be added when done

    let course_num = document.querySelector('#course-number').value;
    let course_name = document.querySelector('#course-name').value;
    let meeting = document.querySelector('#meeting-input').value;
    let semester = document.querySelector('#semester-input').value;
    let description = document.querySelector('#desc-input').value;


    let data = {
    course_number: course_num,
    course_name: course_name,
    description: description,
    meeting: meeting,
    semester: semester
    }
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
            if(response.error.code == "auth/id-token-expired")
            return window.location.href = "../../index.html";
            // On success response, then redirect to courses
            if(response.message)
            return window.location.href = 'icourses.html'

            if (response.error)
                return console.log(user);
            
        })
        .catch(error => console.log('error', error));

}




