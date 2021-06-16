// Logique connexion utilisateur
var login = document.getElementById('login');

// Données du formulaire

let email = document.querySelector('.connexion input[name="email"]');
let password = document.querySelector('.connexion input[name="password"]');

login.addEventListener('click', function () {
    let dataUser = {
        email: email.value,
        password: password.value
    }

    appelAjax(
        // Modification des paramètres par défaut
        {
            api : '/api/auth/login',
            method: "POST",
            data : JSON.stringify(dataUser), 
            listHeader: [
                { "name": "content-type", "value": "application/json" }
            ]
        })
        .then((result) => {
            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("isAdmin", result.isAdmin);
            window.location.assign('main.html');

        }).catch((resultFailed) => {
            var resultFailed = "Oups, une erreur s'est produite !";
            alert (resultFailed);
            
        });
    
});

// Logique inscription utilisateur
var signup = document.getElementById('signup');

// Données du formulaire

let newName = document.querySelector('.inscription input[name="name"]');
let newLastName = document.getElementById("lastName");
let newEmail = document.querySelector('.inscription input[name="email"]');
let newPassword = document.querySelector('.inscription input[name="password"]');

signup.addEventListener('click', function () {
    let dataNewUser = {
        name: newName.value,
        lastName: newLastName.value,
        email: newEmail.value,
        password: newPassword.value
    }

    appelAjax(
        // Modification des paramètres par défaut
        {
            api : '/api/auth/signup',
            method: "POST",
            data : JSON.stringify(dataNewUser),
            status: 201, 
            listHeader: [
                { "name": "content-type", "value": "application/json" }
            ]
        })
        .then((result) => {
            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.UserId);
            localStorage.setItem("isAdmin", result.isAdmin);
            window.location.assign('main.html');

        }).catch((resultFailed) => {
            var resultFailed = "Oups, une erreur s'est produite !";
            alert (resultFailed);

        });

     
});