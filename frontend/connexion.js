// Logique connexion utilisateur
var login = document.getElementById('login');

// Données du formulaire

let email = document.querySelector('.connexion input[name="email"]');
let password = document.querySelector('.connexion input[name="password"]');

login.addEventListener('click', function () {
    let valid = true;
    // Selection de tous les inputs du formulaire
    let myInput = document.querySelectorAll('.input--connexion');

    let myRegexOther = /^[a-zA-Z0-9-\s]+$/;
    let myRegexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Boucle qui vérifie la validité des données
    myInput.forEach(function (input) {
        // Vérifie si le champs est vide
        if (input.value == "") {
            alert("Il semblerait qu'un champs soit vide !");

        } else {
            if (input.type == "email") {
                // Vérifie le champs adresse mail
                if (myRegexMail.test(input.value) == false) {
                    alert("Le format n'est pas correct ! Exemple attendu : prenom.nom@test.fr");
                }
                // Vérifie les autres champs
            } else if (myRegexOther.test(input.value) == false) {
                alert("Le format n'est pas correct ! Ce champs ne peut contenir que des lettres ou des chiffres !");
            }
        }
    });

    if (true) {
        let dataUser = {
            email: email.value,
            password: password.value
        }
        appelAjax(
            // Modification des paramètres par défaut
            {
                api: '/api/auth/login',
                method: "POST",
                data: JSON.stringify(dataUser),
                listHeader: [
                    { "name": "content-type", "value": "application/json" }
                ]
            })
            .then((result) => {
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.userId);
                localStorage.setItem("isAdmin", result.isAdmin);
                window.location.assign('main.html');
                alert("Bienvenu parmis nous !");
    
            }).catch((resultFailed) => {
                var resultFailed = "Oups, une erreur s'est produite !";
                alert(resultFailed);
    
            });
    }

});

// Logique inscription utilisateur
var signup = document.getElementById('signup');

// Données du formulaire

let newName = document.querySelector('.inscription input[name="name"]');
let newLastName = document.getElementById("lastName");
let newEmail = document.querySelector('.inscription input[name="email"]');
let newPassword = document.querySelector('.inscription input[name="password"]');

signup.addEventListener('click', function () {
    // Vérification avant envoi du formulaire
    let valid = true;
    // Selection de tous les inputs du formulaire
    let myInput = document.querySelectorAll('.input--inscription');
    // Regex
    let myRegexOther = /^[a-zA-Z0-9-\s]+$/;
    let myRegexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Boucle qui vérifie la validité des données
    myInput.forEach(function (input) {
        // Vérifie si le champs est vide
        if (input.value == "") {
            alert("Il semblerait qu'un champs soit vide !");

        } else {
            if (input.type == "email") {
                // Vérifie le champs adresse mail
                if (myRegexMail.test(input.value) == false) {
                    alert("Le format n'est pas correct ! Exemple attendu : prenom.nom@test.fr");
                }
                // Vérifie les autres champs
            } else if (myRegexOther.test(input.value) == false) {
                alert("Le format n'est pas correct ! Ce champs ne peut contenir que des lettres ou des chiffres !");
            }
        }
    });

    // Envoi du formulaire
    if (valid) {
        let dataNewUser = {
            name: newName.value,
            lastName: newLastName.value,
            email: newEmail.value,
            password: newPassword.value
        }
    
    appelAjax(
        // Modification des paramètres par défaut
        {
            api: '/api/auth/signup',
            method: "POST",
            data: JSON.stringify(dataNewUser),
            status: 201,
            listHeader: [
                { "name": "content-type", "value": "application/json" }
            ]
        })
        .then((result) => {
            alert("Félicitation ! Votre compte a bien été créé ! Veuillez vous connecter");

        }).catch((resultFailed) => {
            var resultFailed = "Oups, une erreur s'est produite !";
            alert(resultFailed);

        });
    }
});


/*
    // Selection de tous les inputs du formulaire
    let myInput = document.querySelectorAll('.input--inscription');

    let myRegexOther = /^[a-zA-Z0-9-\s]+$/;
    let myRegexMail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    // Boucle qui vérifie la validité des données
    myInput.forEach(function (input) {
        // Vérifie si le champs est vide
        if (input.value == "") {
            alert("Il semblerait qu'un champs soit vide !");

        } else {
            if (input.type == "email") {
                // Vérifie le champs adresse mail
                if (myRegexMail.test(input.value) == false) {
                    alert("Le format n'est pas correct ! Exemple attendu : prenom.nom@test.fr");
                }
                // Vérifie les autres champs
            } else if (myRegexOther.test(input.value) == false) {
                alert("Le format n'est pas correct ! Ce champs ne peut contenir que des lettres ou des chiffres !");
            }
        }
    });
*/