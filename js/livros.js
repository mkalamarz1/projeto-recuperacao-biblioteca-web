
import { livrosCadastrados } from "../dados/livros-cadastrados.js";

const CHAVE_LIVROS = "livrosCadastrados";

function obterLivros() {
    const livrosSalvos = sessionStorage.getItem(CHAVE_LIVROS);

    if (livrosSalvos) {
        return JSON.parse(livrosSalvos);
    }

    sessionStorage.setItem(
        CHAVE_LIVROS,
        JSON.stringify(livrosCadastrados)
    );

    return [...livrosCadastrados];
}

export function cadastrarLivro(livro) {
    return new Promise((resolve, reject) => {
        try {
            const livros = obterLivros();

            const novoLivro = {
                ...livro,
                id: livros.length > 0
                    ? Math.max(...livros.map((item) => item.id)) + 1
                    : 1
            };

            livros.push(novoLivro);

            sessionStorage.setItem(
                CHAVE_LIVROS,
                JSON.stringify(livros)
            );

            resolve("Livro cadastrado com sucesso!");
        } catch (erro) {
            reject(new Error("Erro ao cadastrar o livro"));
        }
    });
}

export function listarLivros() {
    return new Promise((resolve, reject) => {
        try {
            resolve(obterLivros());
        } catch (erro) {
            reject(new Error("Erro ao listar livros"));
        }
    });
}
