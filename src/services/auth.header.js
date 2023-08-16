export default function authHeader() {
    const userToken = JSON.parse(localStorage.getItem('token'));

    if (userToken) {
        return { Authorization: 'Bearer ' + userToken };
    } else {
        return {};
    }
}
