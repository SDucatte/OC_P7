/*
// Affichage du post à modifier


appelAjax({api: "/api/post/" + modifyPostId}).then(() => {
let modifyPost = document.getElementById('modifyPost');
modifyPost.innerHTML += showModifyPost();
/*
    let modifyPostId = document.querySelector('.container').dataset.id;
    modifyPost(modifyPostId);
    
})
.catch((failed) => {
    var failed = "Oups, une erreur s'est produite !";
    alert(failed);
}); 

*/



let newTitle = document.getElementById('newTitle');
let newContent = document.getElementById('newContent');
let userId = localStorage.getItem('userId');

let modifyBtn = document.getElementById('modify');

modifyBtn.addEventListener('click', function (e) {
    // Vérification qu'un champs ne soit pas vide
    e.preventDefault();
    let modifyPostId = localStorage.getItem('modifyPostId');
    let valid = true
    if (newTitle.value == "" || newContent.value == "") {
        var missingValue = "Oups, il manque une info !"
        alert(missingValue);
        valid = false
    }
    if (valid) {
        let newData = new FormData();
        newData.append("post", JSON.stringify({
            newTitle: newTitle.value,
            newContent: newContent.value,
            UserId: userId
        }));
        newData.append("image", document.getElementById('addNewFile').files[0]);

        appelAjax({
            api: '/api/post/' + modifyPostId,
            method: "PUT",
            data: newData,
            status: 201
        })
            .then(() => {
                var resultSuccess = "Votre post a bien été publié !";
                alert(resultSuccess);
                window.location.assign('main.html');
            })
            .catch((resultFailed) => {
                var resultFailed = "Oups, une erreur s'est produite !";
                alert(resultFailed);

            });
    }
});

