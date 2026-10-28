
window.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
        window.location.href = "dashboard/dashboard.html";
    } else {
        window.location.href = "login/login.html";
    }
});
