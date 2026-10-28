
export class Livro {
    constructor(dados) {
        this.id = dados.id ?? null;
        this.titulo = dados.titulo;
        this.autor = dados.autor;
        this.categoria = dados.categoria;
        this.paginas = dados.paginas;
        this.disponivel = dados.disponivel ?? true;
    }
}
