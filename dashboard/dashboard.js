
import { exibirEstatisticas } from "../js/estatisticas.js";

const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "../login/login.html";
} else {
    const usuario = JSON.parse(usuarioLogado);

    document.getElementById("nomeUsuario").textContent = usuario.nome;

    carregarEstatisticas();
}

async function carregarEstatisticas() {
    try {
        const estatisticas = await exibirEstatisticas();

        document.getElementById("totalLivros").textContent =
            estatisticas.totalLivros;

        document.getElementById("livrosDisponiveis").textContent =
            estatisticas.livrosDisponiveis;

        document.getElementById("livrosIndisponiveis").textContent =
            estatisticas.livrosIndisponiveis;

        document.getElementById("totalPaginas").textContent =
            estatisticas.totalPaginas;

        document.getElementById("mediaPaginas").textContent =
            estatisticas.mediaPaginas.toFixed(1);
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar as estatísticas.");
    }
}

document.getElementById("btnSair").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "../login/login.html";
});
