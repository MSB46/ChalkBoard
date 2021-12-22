
const prepare = (courseId) => {
    localStorage.setItem('courseId', courseId);
}


const addInstructor = async (e) => {
    e.preventDefault();
    let courseID = localStorage.getItem('courseId');
    let email = document.querySelector('#email-add-target').value;
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/addInstructor`

    // Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)

    let data = {
        courseId: courseID,
        email: email
    }
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
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

            if (courses.error){
                alert(courses.error)
                return console.log(courses.error)
            }
                alert(courses.message);
        })
        .catch(error => console.log('error', error));

}


const removeInstructor = async (e) => {
    e.preventDefault();
    let courseID = localStorage.getItem('courseId');
    let email = document.querySelector('#email-remove-target').value;
    console.log(email);
    console.log(courseID);
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/removeIns`

    // Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    let removeIns = {
        courseID: courseID,
        email: email
    }

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify(removeIns)
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

            if (courses.error){
                alert(courses.error)
                return console.log(courses.error)
            }
                alert(courses.message);
            
        })
        .catch(error => console.log('error', error));

}


const deleteCourse = async (e) => {
    e.preventDefault();

    let check = document.querySelector('#delete-target').value
    if(check != 'Delete Course')
    return console.log('Please, type "Delete Course" correctly');
    let courseID = localStorage.getItem('courseId');
    let API = `https://us-central1-project-93bdb.cloudfunctions.net/api/delCourse`

    // Must be added when done

    let myHeaders = new Headers();
    let token = "Bearer "+localStorage.getItem('token');

    myHeaders.append('Authorization', token)
    let removeIns = {
        courseID: courseID,
    }

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify(removeIns)
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

            if (courses.error){
                alert(courses.error)
                return console.log(courses.error)
            }
                alert(courses.success);
                return window.location.reload();
            
        })
        .catch(error => console.log('error', error));


}

const test=()=>{
    console.log(courseID);
}
const setCoID = (courseID) => {
    localStorage.setItem('courseId', courseID);
}