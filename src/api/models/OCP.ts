export interface IOcp {

    idOCP: string | null;

    nomeOCP: string;

    dataCad?: string;

    dataMod?: string;

}

export default class Ocp {

    private _idOCP: string | null;
    private _nomeOCP: string;
    private _dataCad: string;
    private _dataMod: string;

    constructor(
        idOCP: string | null,
        nomeOCP: string,
        dataCad?: string,
        dataMod?: string
    ) {
        this._idOCP = idOCP || null;
        this._nomeOCP = nomeOCP;
        this._dataCad = dataCad || new Date().toISOString();
        this._dataMod = dataMod || new Date().toISOString();
    }

    // GETTERS
    get idOCP() { return this._idOCP; }
    get nomeOCP() { return this._nomeOCP; }
    get dataCad() { return this._dataCad; }
    get dataMod() { return this._dataMod; }

    // SETTERS
    set nomeOCP(nome: string) {
        this.validarTexto(nome, "Nome OCP", 2, 50);
        this._nomeOCP = nome;
    }

    // VALIDATION
    private validarTexto(valor: string, campo: string, min: number, max: number) {
        if (valor.trim().length < min || valor.trim().length > max) {
            throw new Error(`O ${campo} deve ter entre ${min} e ${max} caracteres.`);
        }
    }

    // FACTORY
    public static create(dados: IOcp): Ocp {
        return new Ocp(
            dados.idOCP,
            dados.nomeOCP,
            dados.dataCad,
            dados.dataMod
        );
    }

    public static edit(id: string, dados: IOcp): Ocp {
        return new Ocp(
            id,
            dados.nomeOCP,
            dados.dataCad,
            dados.dataMod
        );
    }

    public toJSON() {
        return {
            idOCP: this._idOCP,
            nomeOCP: this._nomeOCP,
            dataCad: this._dataCad,
            dataMod: this._dataMod
        };
    }
}