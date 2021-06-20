class Post {
    constructor(jsonPost) {
        jsonPost && Object.assign(this, jsonPost);
        this.Comments = this.Comments.map(element => new Comment(element));
    }

    // Affichage du mur de publication
    showPost() {
        return `<div class="post-card" data-id='${this.id}'>
        <div class="content--post">
            <div class="btn--block">
            <button class="dropbtn" id="dropButton"><i class="far fa-trash-alt"></i></button>
            <button class="modifybtn" id="modifyButton">
            <a href="modifyPost.html">
            <i class="far fa-edit"></i>
            </a>
            </button>
            </div>
            <div class= "info--post">
                <h2 class"title--post">${this.title}</h2>  
                <span class="user user--publish">publié par : ${this.User.name}</span>
                <p class"content content--post">${this.content}</p>
                ${this.showImg()}
            </div>
        </div>    
        <div class="content-comment">
            <input id="comment" class="comment-input" type="text" placeholder="Donnez votre avis !">
            <button id="publish-comment" class="comment-button" type="submit"><i class="far fa-paper-plane"></i></button>
            </div>
            <div class="show-comment">
            ${this.showComments()}
            </div>
        </div>
        `
    }
    showImg() {
        if (this.imageUrl != null) {
            return `<img class="img--post" src='${this.imageUrl}'>`;
        } else {
            return "";
        }
    }
    showComments() {
        let listComment = "";
        this.Comments.forEach(comment => {
            listComment += comment.show();
        });
        return listComment;
    }
    // ajouter une fonction récupérant les données du post à modifier
}

