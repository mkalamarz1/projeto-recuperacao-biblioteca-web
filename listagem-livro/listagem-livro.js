
import { listarLivros } from "../js/livros.js";

const listaLivros = document.getElementById("listaLivros");
const mensagem = document.getElementById("mensagem");

const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "../login/login.html";
} else {
    const usuario = JSON.parse(usuarioLogado);
    document.getElementById("nomeUsuario").textContent = usuario.nome;
    carregarLivros();
}

document.getElementById("btnSair").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "../login/login.html";
});

async function carregarLivros() {
    try {
        const livros = await listarLivros();

        listaLivros.innerHTML = "";

        if (livros.length === 0) {
            listaLivros.innerHTML = `
                <tr>
                    <td colspan="4">Nenhum livro cadastrado.</td>
                </tr>
            `;
            return;
        }

        livros.forEach((livro) => {
            const linha = document.createElement("tr");

            const titulo = document.createElement("td");
            titulo.textContent = livro.titulo;

            const autor = document.createElement("td");
            autor.textContent = livro.autor;

            const categoria = document.createElement("td");
            categoria.textContent = livro.categoria;

            const paginas = document.createElement("td");
            paginas.textContent = livro.paginas;

            linha.append(titulo, autor, categoria, paginas);
            listaLivros.appendChild(linha);
        });
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao listar livros.";
        mensagem.style.color = "red";
    }
}
