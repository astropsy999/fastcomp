export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD" || "EMAIL_NOT_FOUND":
            return "Email або пароль невірно";
        case "EMAIL_EXISTS":
            return "Користувач з таким email вже існує";
        default:
            return "Занадно багато спроб увійти. Спробуйте пізніше";
    }
}
