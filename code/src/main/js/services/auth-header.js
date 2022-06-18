import AuthService from "./auth.service";

export default function authHeader() {
    const user = AuthService.getCurrentUser();

    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken};
    } else {
        return {};
    }
}
