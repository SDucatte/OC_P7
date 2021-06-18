class Post {
    constructor(jsonPost) {
        jsonPost && Object.assign(this, jsonPost);
        this.Comments = this.Comments.map(element => new Comment(element));
    }

    // Affichage du mur de publication
    showPost() {
        return `<div class="post-card" data-id='${this.id}'>
        <div class="content-post">  
        <button class="dropbtn" id="dropButton"><i class="far fa-trash-alt"></i></button>
        
        <button class="modifybtn" id="modifyButton">
        <a href="modifyPost.html">
        <i class="far fa-edit">
        </i>
        </a>
        </button>
        
        <span class="user">${this.User.name}</span>
        <h2>${this.title}</h2>
        <p>${this.content}</p>
        ${this.showImg()}
        </div>
        <div class="content-comment">
        ${this.showComments()}
        <div>
        
        <input id="comment" class="comment-input" type="text" placeholder="Donnez votre avis !">
            <button id="publish-comment" class="comment-button" type="submit"><i class="far fa-paper-plane"></i></button>
        `
    }
    showImg(){
        if (this.imageUrl != null){
            return `<img src='${this.imageUrl}'>`;
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
    showModifyPost (){
        return `
        <form class="container" data-id='${this.id}'>
            <label class="post-header">Modifer votre publication</label>
            <input id="newTitle" class="post-title" type="text" placeholder="Quoi de neuf ?">
            <input id="newContent" class="post-content" type="text" placeholder="Saluez vos collègues !">
            <input id="addNewFile" type="file">
            <button id="modify" class="publish-button" type="submit">Publiez !</button>
        </form>
        `
    }
    // ajouter une fonction récupérant les données du post à modifier
}

