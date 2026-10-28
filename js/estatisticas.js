
import { listarLivros } from "./livros.js";

export function exibirEstatisticas() {
    return new Promise(async (resolve, reject) => {
        try {
            const livros = await listarLivros();

            const totalLivros = livros.length;

            const livrosDisponiveis = livros.filter(
                (livro) => livro.disponivel === true
            ).length;

            const livrosIndisponiveis = livros.filter(
                (livro) => livro.disponivel === false
            ).length;

            const totalPaginas = livros.reduce(
                (total, livro) => total + Number(livro.paginas),
                0
            );

            const mediaPaginas = totalLivros > 0
                ? totalPaginas / totalLivros
                : 0;

            resolve({
                totalLivros,
                livrosDisponiveis,
                livrosIndisponiveis,
                totalPaginas,
                mediaPaginas
            });
        } catch (erro) {
            reject(new Error("Erro ao exibir estatísticas"));
        }
    });
}
