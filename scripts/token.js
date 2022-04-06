function isTokenExpired() {
    let token = localStorage.getItem("token");

    if (!token)
        return false;
    const expire = (JSON.parse(atob(token.split(".")[1]))).exp;
    const now = (Math.floor((new Date).getTime() / 1000));
    return now >= expire;
}

function checkToken() {
    if (isTokenExpired()) {
        localStorage.removeItem("token");
    }
}

checkToken();