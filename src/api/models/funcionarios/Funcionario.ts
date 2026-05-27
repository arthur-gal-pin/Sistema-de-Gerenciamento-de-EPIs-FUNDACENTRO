import { enumSituacaoEmpregaticia } from "../../enum/funcionarios/situacaoEmpregaticia";

export class Funcionario {
    private _idFuncionario: string | null;
    private _idCargo: string;
    private _nomeFuncionario: string;
    private _sobrenomeFuncionario: string;
    private _cpf: string;
    private _senhaHash: string;
    private _caminhoImagemPerfil: string;
    private _situacaoEmpregaticia: enumSituacaoEmpregaticia;
    private _dataCad: string | null;
    private _dataMod: string | null;

    constructor(
        idFuncionario: string | null,
        idCargo: string,
        nomeFuncionario: string,
        sobrenomeFuncionario: string,
        cpf: string,
        senhaHash: string,
        caminhoImagemPerfil: string,
        situacaoEmpregaticia: enumSituacaoEmpregaticia,
        dataCad: string | null,
        dataMod: string | null
    ) {
        this._idFuncionario = idFuncionario || null;
        this._idCargo = idCargo;
        this._nomeFuncionario = nomeFuncionario;
        this._sobrenomeFuncionario = sobrenomeFuncionario;
        this._cpf = cpf;
        this._senhaHash = senhaHash;
        this._caminhoImagemPerfil = caminhoImagemPerfil;
        this._situacaoEmpregaticia = situacaoEmpregaticia;
        this._dataCad = dataCad || null;
        this._dataMod = dataMod || null;
    }

    // --- GETTERS ---
    get idFuncionario() { return this._idFuncionario; }
    get idCargo() { return this._idCargo; }
    get nomeFuncionario() { return this._nomeFuncionario; }
    get sobrenomeFuncionario() { return this._sobrenomeFuncionario; }
    get cpf() { return this._cpf; }
    get senhaHash() { return this._senhaHash; }
    get caminhoImagemPerfil() { return this._caminhoImagemPerfil; }
    get situacaoEmpregaticia() { return this._situacaoEmpregaticia; }
    get dataCad() { return this._dataCad; }
    get dataMod() { return this._dataMod; }

    // --- SETTERS ---
    set idCargo(id: string) { this._idCargo = id; }

    set nomeFuncionario(nome: string) {
        this.validarTexto(nome, "Nome", 2, 50);
        this._nomeFuncionario = nome;
    }

    set sobrenomeFuncionario(sobrenome: string) {
        this.validarTexto(sobrenome, "Sobrenome", 2, 50);
        this._sobrenomeFuncionario = sobrenome;
    }

    set cpf(valor: string) {
        this.validarCpf(valor);
        this._cpf = valor;
    }

    set senhaHash(hash: string) { this._senhaHash = hash; }

    set caminhoImagemPerfil(caminho: string) { this._caminhoImagemPerfil = caminho; }

    set situacaoEmpregaticia(situacao: enumSituacaoEmpregaticia) {
        this._situacaoEmpregaticia = situacao;
    }

    // --- VALIDATION METHODS ---
    private validarTexto(valor: string, campo: string, min: number, max: number) {
        if (valor.trim().length < min || valor.trim().length > max) {
            throw new Error(`O ${campo} está inválido. Deve ter entre ${min} e ${max} caracteres.`);
        }
    }

    private validarCpf(cpf: string) {
        // Validação básica de comprimento para o exemplo
        if (cpf.replace(/\D/g, '').length !== 11) {
            throw new Error('O CPF deve conter 11 dígitos numéricos.');
        }
    }

    // --- FACTORY METHODS ---
    public static create(dados: any): Funcionario {
        return new Funcionario(
            dados.idFuncionario,
            dados.idCargo,
            dados.nomeFuncionario,
            dados.sobrenomeFuncionario,
            dados.cpf,
            dados.senhaHash,
            dados.caminhoImagemPerfil,
            dados.situacaoEmpregaticia as enumSituacaoEmpregaticia,
            dados.dataCad,
            dados.dataMod
        );
    }

    public static edit(id: string, dados: any): Funcionario {
        return new Funcionario(
            id,
            dados.idCargo,
            dados.nomeFuncionario,
            dados.sobrenomeFuncionario,
            dados.cpf,
            dados.senhaHash,
            dados.caminhoImagemPerfil,
            dados.situacaoEmpregaticia as enumSituacaoEmpregaticia,
            dados.dataCad,
            dados.dataMod
        );
    }

    public toJSON() {
        return {
            idFuncionario: this._idFuncionario,
            idCargo: this._idCargo,
            nomeFuncionario: this._nomeFuncionario,
            sobrenomeFuncionario: this._sobrenomeFuncionario,
            cpf: this._cpf,
            senhaHash: this._senhaHash,
            caminhoImagemPerfil: this._caminhoImagemPerfil,
            situacaoEmpregaticia: this._situacaoEmpregaticia,
            dataCad: this._dataCad,
            dataMod: this._dataMod
        };
    }
}