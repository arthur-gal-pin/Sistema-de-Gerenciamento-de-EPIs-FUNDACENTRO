import { TelefoneMap } from "../../mappings";
import { TelefoneAttributes } from "../../mappings/funcionarios/telefone.map";

export class TelefoneRepository {
    async buscarPorFuncionario(idFuncionario: string) {
        return await TelefoneMap.findAll({
            where: { FK_idFuncionario: idFuncionario }
        });
    }

    async adicionarTelefone(dados: any) {
        return await TelefoneMap.create(dados);
    }

    async removerTelefone(idTelefone: string) {
        return await TelefoneMap.destroy({
            where: { idTelefone: idTelefone }
        });
    }
}