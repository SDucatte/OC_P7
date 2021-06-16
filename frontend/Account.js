class User {
    constructor(jsonUser) {
        jsonUser && Object.assign(this, jsonUser);
    }
// Faire la route sur le back
    showUserInfo() {
        return `<div class="account--input">
        <h2>
            Prénom
        </h2>
        <p>
        ${this.name}
        </p>
    </div>

    <div class="account--input">
        <h2>
            Nom
        </h2>
        <p>
        ${this.lastName}
        </p>
    </div>

    <div class="account--input">
        <h2>
            E-mail
        </h2>
        <p>
        ${this.email}
        </p>
    </div>`
    }
}
