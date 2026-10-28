
const moment = window.moment;
import { Usuario } from "../js/Usuario.js";
import { cadastrarUsuario } from "../js/usuarios.js";

const formulario = document.getElementById("formUsuario");
const mensagem = document.getElementById("mensagem");
const campoCep = document.getElementById("cep");

const usuarioLogado = sessionStorage.getItem("usuarioLogado");

// Verifica se o usuário está autenticado.
if (!usuarioLogado) {
    window.location.href = "../login/login.html";
} else {
    const usuario = JSON.parse(usuarioLogado);
    document.getElementById("nomeUsuario").textContent = usuario.nome;
}

// Botão para sair do sistema.
document.getElementById("btnSair")?.addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "../login/login.html";
});

// Consulta o CEP e preenche o endereço automaticamente.
campoCep.addEventListener("blur", async () => {
    const cep = campoCep.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        return;
    }

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Falha na consulta do CEP.");
        }

        const endereco = await resposta.json();

        if (endereco.erro) {
            mensagem.style.color = "red";
            mensagem.textContent = "CEP não encontrado.";
            return;
        }

        document.getElementById("cidade").value =
            endereco.localidade || "";

        document.getElementById("estado").value =
            endereco.uf || "";

        document.getElementById("logradouro").value =
            endereco.logradouro || "";

        document.getElementById("bairro").value =
            endereco.bairro || "";

        mensagem.textContent = "";
    } catch (erro) {
        mensagem.style.color = "red";
        mensagem.textContent = "Não foi possível consultar o CEP.";
    }
});

// Cadastra um novo usuário.
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    mensagem.textContent = "";
    mensagem.style.color = "red";

    const dataNascimento =
        document.getElementById("dataNascimento").value.trim();

    const dataValida = moment(
        dataNascimento,
        "DD/MM/YYYY",
        true
    );

    const dataMinima = moment(
        "01/01/1900",
        "DD/MM/YYYY",
        true
    );

    if (
        !dataValida.isValid() ||
        !dataValida.isAfter(dataMinima) ||
        !dataValida.isBefore(moment(), "day")
    ) {
        mensagem.textContent =
            "Informe uma data válida entre 01/01/1900 e hoje.";
        return;
    }

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        genero: document.getElementById("genero").value,
        dataNascimento: dataValida.format("YYYY-MM-DD"),
        cpf: document.getElementById("cpf").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        cep: campoCep.value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        estado: document.getElementById("estado").value.trim(),
        logradouro: document.getElementById("logradouro").value.trim(),
        numero: document.getElementById("numero").value.trim(),
        complemento: document.getElementById("complemento").value.trim(),
        bairro: document.getElementById("bairro").value.trim()
    };

    // O complemento é opcional; os demais campos são obrigatórios.
    const camposObrigatorios = [
        dados.nome,
        dados.genero,
        dados.cpf,
        dados.telefone,
        dados.email,
        dados.cep,
        dados.cidade,
        dados.estado,
        dados.logradouro,
        dados.numero,
        dados.bairro
    ];

    if (camposObrigatorios.some((valor) => valor === "")) {
        mensagem.textContent =
            "Preencha todos os campos obrigatórios.";
        return;
    }

    try {
        const novoUsuario = new Usuario(dados);
        const resultado = await cadastrarUsuario(novoUsuario);

        mensagem.style.color = "green";
        mensagem.textContent = resultado;

        formulario.reset();
    } catch (erro) {
        mensagem.style.color = "red";
        mensagem.textContent =
            erro.message || "Erro ao cadastrar o usuário.";
    }
});
