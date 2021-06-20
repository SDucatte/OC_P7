class Comment {
    constructor(jsonComment) {
        jsonComment && Object.assign(this, jsonComment);
    }

    // Affichage du mur de publication
    show() {
        // Comment récupérer le nom de la table user pour l'afficher ? Ajouter quelque
        return `
        <div class="comment-section" data-commentid='${this.id}'>
        <a class="drop-comment"><i class="far fa-trash-alt"></i></a>
            <div class="block--comment">
                <h3 class="title--comment">${this.User.name}</h3>
                <p class="content--comment">${this.comment}</p>
            </div>
        </div>
        `
    }
}

