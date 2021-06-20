class User {
    constructor(jsonUser) {
        jsonUser && Object.assign(this, jsonUser);
    }
// Faire la route sur le back
    showUserInfo() {
        return `<div class="account--input">
        <h2 class="title--account">
            Prénom
        </h2>
        <p class="info--account">
        ${this.name}
        </p>
    </div>

    <div class="account--input">
        <h2 class="title--account">
            Nom
        </h2>
        <p class="info--account">
        ${this.lastName}
        </p>
    </div>

    <div class="account--input">
        <h2 class="title--account">
            E-mail
        </h2>
        <p class="info--account">
        ${this.email}
        </p>
    </div>

    <button id="disableAccount" class="btn btn--account">Désactiver le compte</button>
    `
    }
}
