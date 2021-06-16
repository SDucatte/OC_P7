appelAjax({
    api: "/api/auth/account",
    listHeader: [
        { "name": "content-type", "value": "application/json" }
    ]
})
    .then((jsonUser) => {
        var theAccount = new User(jsonUser);
        document.getElementById('userInfo').innerHTML += theAccount.showUserInfo();
        disableAccount();
    })
    .catch((failed) => {
        var failed = "Oups, une erreur s'est produite !";
        alert(failed);
    });

// Désactivation compte

function disableAccount(){
    let dropAccount = document.getElementById('disableAccount');
    dropAccount.addEventListener('click', function () {
        appelAjax({
            api: "/api/auth/account",
            method: "DELETE"
        })
            .then(() => {
                var resultSuccess = "Votre post a bien été publié !";
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("isAdmin");
                alert(resultSuccess);
                window.location.assign('connexion.html')
            })
            .catch((resultFailed) => {
                var resultFailed = "Oups, une erreur s'est produite !";
                alert(resultFailed);
    
            });
    });
};
