
import { usuariosCadastrados } from "../dados/usuarios-cadastrados.js";

const CHAVE_USUARIOS = "usuariosCadastrados";

function obterUsuarios() {
    const usuariosSalvos = sessionStorage.getItem(CHAVE_USUARIOS);

    if (usuariosSalvos) {
        return JSON.parse(usuariosSalvos);
    }

    sessionStorage.setItem(
        CHAVE_USUARIOS,
        JSON.stringify(usuariosCadastrados)
    );

    return [...usuariosCadastrados];
}

export function cadastrarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        try {
            const usuarios = obterUsuarios();

            const novoUsuario = {
                ...usuario,
                id: usuarios.length > 0
                    ? Math.max(...usuarios.map((item) => item.id)) + 1
                    : 1
            };

            usuarios.push(novoUsuario);

            sessionStorage.setItem(
                CHAVE_USUARIOS,
                JSON.stringify(usuarios)
            );

            resolve("Usuário cadastrado com sucesso!");
        } catch (erro) {
            reject(new Error("Erro ao cadastrar o usuário"));
        }
    });
}

export function listarUsuarios() {
    return new Promise((resolve, reject) => {
        try {
            resolve(obterUsuarios());
        } catch (erro) {
            reject(new Error("Erro ao listar usuários"));
        }
    });
}
