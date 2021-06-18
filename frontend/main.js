// Affichage de tous les post
appelAjax({ api: "/api/post" }).then((listPost) => {
    listPost.forEach(postJson => {
        var post = new Post(postJson);
        document.getElementById('wall').innerHTML += post.showPost();
    });
    // Ajout + affichage commentaire
    let commentBtn = document.querySelectorAll('.comment-button');
    commentBtn.forEach(btn => {
        btn.addEventListener('click', function () {
            let comment = this.closest('.content-comment').querySelector('.comment-input').value;
            let postId = this.closest('.post-card').dataset.id;
            addComment(comment, postId);
        });
    });
    // Suppression Post
    // Chose bizarre : Lorsque je créé un post, je peux supprimer mais lorsque j'ai un nouveau token, ca ne marche pas
    let dropBtn = document.querySelectorAll('.dropbtn');
    dropBtn.forEach(otherBtn => {
        otherBtn.addEventListener('click', function () {
            let dropPostId = this.closest(".post-card").dataset.id;
            dropPost(dropPostId);
        });
    });

    // Modification de post
    let modifyBtn = document.querySelectorAll('.modifybtn');
    modifyBtn.forEach(otherBtn => {
        otherBtn.addEventListener('click', function () {
            let modifyPostId = this.closest(".post-card").dataset.id;
            localStorage.setItem('modifyPostId', modifyPostId);
        });
    });

    // Suppression Commentaire

    let dropCommentBtn = document.querySelectorAll('.drop-comment');
    dropCommentBtn.forEach(anotherBtn => {
        anotherBtn.addEventListener('click', function () {
            let dropCommentId = this.closest(".comment-section").dataset.commentid;
            dropComment(dropCommentId);
        });
    });

})

    .catch((failed) => {
        var failed = "Oups, une erreur s'est produite !";
        alert(failed);
    });



// Nouveau post 
let publish = document.getElementById('publish');
let title = document.getElementById('title');
let content = document.getElementById('content');
let userId = localStorage.getItem('userId');

publish.addEventListener('click', function (e) {
    // Vérification qu'un champs ne soit pas vide
    e.preventDefault();
    let valid = true
    if (title.value == "" || content.value == "") {
        var missingValue = "Oups, il manque une info !"
        alert(missingValue);
        valid = false
    }
    if (valid) {
        let data = new FormData();
        data.append("post", JSON.stringify({
            title: title.value,
            content: content.value,
            UserId: userId

        }));
        data.append("image", document.getElementById('addFile').files[0]);

        appelAjax({
            api: '/api/post',
            method: "POST",
            data: data,
            status: 201
        })
            .then(() => {
                var resultSuccess = "Votre post a bien été publié !";
                alert(resultSuccess);
                window.location.reload();
            })
            .catch((resultFailed) => {
                var resultFailed = "Oups, une erreur s'est produite !";
                alert(resultFailed);

            });
    }
});






// Fonction addComment

function addComment(comment, postId) {
    let valid = true
    if (comment == "") {
        var missingValue = "Oups, il manque une info !"
        alert(missingValue);
        valid = false
    }
    if (valid) {
        let dataComment = {
            comment: {
                comment: comment,
                UserId: userId,
                PostId: postId
            }
        }
        appelAjax({
            api: '/api/comment',
            method: "POST",
            data: JSON.stringify(dataComment),
            status: 201,
            listHeader: [
                { "name": "content-type", "value": "application/json" }
            ]
        })
            .then(() => {
                var resultSuccess = "Votre commentaire a bien été publié !";
                alert(resultSuccess);
                window.location.reload();
            })
            .catch((resultFailed) => {
                var resultFailed = "Oups, une erreur s'est produite !";
                alert(resultFailed);

            });
    }
}

// fonction suppression de post
function dropPost(dropPostId) {
    // On vérifie que l'auteur du post et la personne qui souhaite supprimer le post sont bien les mêmes

   // Récupération Id du post
   
    appelAjax({
        api: '/api/post/' + dropPostId,
        method: "DELETE"
    })
        .then(() => {
            var resultSuccess = "Votre Post a bien été supprimé !";
            alert(resultSuccess);
            window.location.reload();
        })
        .catch((resultFailed) => {
            var resultFailed = "Il semblerait que ce ne soit pas votre post !";
            alert(resultFailed);

        });
}

// Fonction suppression de commentaire
function dropComment(dropCommentId) {
    // On vérifie que l'auteur du post et la personne qui souhaite supprimer le post sont bien les mêmes

   // Récupération Id du post
   
    appelAjax({
        api: '/api/comment/' + dropCommentId,
        method: "DELETE"
    })
        .then(() => {
            var resultSuccess = "Votre commentaire a bien été supprimé !";
            alert(resultSuccess);
            window.location.reload();
        })
        .catch((resultFailed) => {
            var resultFailed = "Il semblerait que ce ne soit pas votre commentaire !";
            alert(resultFailed);
        });
}

// Modification de post




// Fonction Modification de Post








/*

// Supprimer post
.then(() => {
    let dropBtn = document.getElementById('drop');

    dropBtn.addEventListener('click', function () {
        appelAjax({
            api: '/api/post/:id',
            method: "DELETE",
            status: 200,
            listHeader: [
                { "name": "content-type", "value": "application/json" }
            ]
        })
        .then(() => {
            var resultSuccess = "Votre post a bien été supprimé !";
            alert(resultSuccess);
        })
        .catch((resultFailed) => {
            var resultFailed = "Oups, une erreur s'est produite !";
            alert(resultFailed);

        });
    });
})

 */

