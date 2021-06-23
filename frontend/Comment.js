class Comment {
    constructor(jsonComment) {
        jsonComment && Object.assign(this, jsonComment);
    }

    // Affichage du mur de publication
    show() {
        return `
        <div class="comment-section" data-commentid='${this.id}'>
            <div class="block--comment">
            <a class="drop-comment"><i class="far fa-trash-alt"></i></a>
                <h3 class="title--comment">${this.User.name}</h3>
                <p class="content--comment">${this.comment}</p>
            </div>
        </div>
        `
    }
}

