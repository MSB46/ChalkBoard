const API_LOGIN = "https://us-central1-project-93bdb.cloudfunctions.net/api/loginAdmin";

const login = (e) => {
    e.preventDefault();
    let email = document.querySelector("#emailUser").value;
    let password = document.querySelector("#passwordUser").value;
    let errorBox = document.querySelector("#error-msg");

    let inputBoxEmail = document.querySelector("#emailUser");
    let inputBoxPw = document.querySelector("#passwordUser");

    inputBoxEmail.getAttribute("disabled");
    inputBoxPw.getAttribute("disabled");

    let loading = document.getElementById("load-msg");
    loading.classList.remove("hide");

    let usertype = localStorage.getItem('user');
    let res = null;
    let data = {
        email: email,
        password: password,
        usertype: usertype
    };

    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data),
        contentType: "application/json"
    };

    fetch(API_LOGIN, requestOptions)
        .then(response => {
                res = response.status;
                if (!response.ok) {
                    loading.classList.add("hide");
                    errorBox.classList.remove("hide");
                    return {error: "Wrong credentials, try again"};

                }
                return response.json()
            }
        )
        .then(user => {
            if (user.error)
                return console.log(user);
            console.log(user.token);
            localStorage.setItem("token", user.token)

            if (usertype == "admin")
            return window.location.href = "admin-view.html";
        })
        .catch(error => console.log('error', error));

    inputBoxEmail.removeAttribute("disabled");
    inputBoxPw.removeAttribute("disabled");


}
