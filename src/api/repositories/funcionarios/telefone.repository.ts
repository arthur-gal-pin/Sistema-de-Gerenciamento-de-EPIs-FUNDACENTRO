import { TelefoneMap } from "../../mappings";
import { ITelefone } from "../../models/funcionarios/Telefone";

export class TelefoneRepository {
    async buscarPorFuncionario(idFuncionario: string) {
        return await TelefoneMap.findAll({
            where: { FK_idFuncionario: idFuncionario }
        });
    }

    async adicionarTelefone(dados: ITelefone) {
        return await TelefoneMap.create(dados);
    }

    async removerTelefone(idTelefone: string) {
        return await TelefoneMap.destroy({
            where: { idTelefone: idTelefone }
        });
    }
}