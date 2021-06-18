class Comment {
    constructor(jsonComment) {
        jsonComment && Object.assign(this, jsonComment);
    }

    // Affichage du mur de publication
    show() {
        // Comment récupérer le nom de la table user pour l'afficher ? Ajouter quelque
        return `
        <div class="comment-section" data-commentid='${this.id}'>
        <h3>${this.User.name}</h3>
        <button class="drop-comment"><i class="far fa-trash-alt"></i></button>
        <p>${this.comment}</p>
        </div>
        `
    }
}

