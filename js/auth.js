
import { usuariosSistema } from "../dados/usuarios-sistema.js";

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        const usuarioEncontrado = usuariosSistema.find(
            (item) => item.email === usuario && item.senha === senha
        );

        if (usuarioEncontrado) {
            resolve(usuarioEncontrado);
        } else {
            reject(new Error("Dados incorretos. Favor verificar e tentar novamente"));
        }
    });
}
