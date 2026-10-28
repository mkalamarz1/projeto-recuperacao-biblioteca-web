
import { login } from "../js/auth.js";

const formulario = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");
const linkEsqueciSenha = document.getElementById("esqueciSenha");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    mensagem.textContent = "";

    try {
        const usuario = await login(email, senha);

        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        window.location.href = "../dashboard/dashboard.html";
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});

linkEsqueciSenha.addEventListener("click", (evento) => {
    evento.preventDefault();

    window.alert("Funcionalidade em construção.");
});
