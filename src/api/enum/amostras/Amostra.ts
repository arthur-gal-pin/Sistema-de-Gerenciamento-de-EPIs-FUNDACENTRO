import { enumSituacaoAmostra } from "../../enum/amostras/situacaoAmostra.enum";
import { enumTipoAmostra } from "../../enum/amostras/tipoAmostra.enum";

export interface IAmostra {

    idAmostra: string | null;

    FK_idOCP: string;

    FK_idEmpresa: string;

    nomeAmostra: string;

    tipoAmostra: enumTipoAmostra;

    situacaoAmostra: enumSituacaoAmostra;

    dataCad?: string;

    dataMod?: string;
}