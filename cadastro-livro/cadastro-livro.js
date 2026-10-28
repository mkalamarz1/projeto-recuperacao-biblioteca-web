
import { Livro } from "../js/Livro.js";
import { cadastrarLivro } from "../js/livros.js";

const formulario = document.getElementById("formLivro");
const mensagem = document.getElementById("mensagem");

const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "../login/login.html";
} else {
    const usuario = JSON.parse(usuarioLogado);
    document.getElementById("nomeUsuario").textContent = usuario.nome;
}

document.getElementById("btnSair").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "../login/login.html";
});

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    mensagem.textContent = "";
    mensagem.style.color = "red";

    const dados = {
        titulo: document.getElementById("titulo").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        categoria: document.getElementById("categoria").value,
        paginas: Number(document.getElementById("paginas").value),
        disponivel: true
    };

    if (
        dados.titulo.length < 4 ||
        dados.titulo.length > 80 ||
        dados.autor.length < 4 ||
        dados.autor.length > 80 ||
        !dados.categoria ||
        !Number.isInteger(dados.paginas) ||
        dados.paginas <= 0
    ) {
        mensagem.textContent = "Verifique os campos obrigatórios.";
        return;
    }

    try {
        const livro = new Livro(dados);
        const resultado = await cadastrarLivro(livro);

        mensagem.style.color = "green";
        mensagem.textContent = resultado;
        formulario.reset();
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});
