import { FuncionarioMap } from '../../mappings';
import { CargoMap } from '../../mappings';
import { TelefoneMap } from '../../mappings';
import { IFuncionario } from '../../models/funcionarios/Funcionario';
import { Op } from 'sequelize'; 


export class FuncionarioRepository {
    
    // Busca funcionário trazendo os dados do Cargo e a lista de Telefones (Eager Loading)
    async buscarCompletoPorId(id: string) {
        return await FuncionarioMap.findByPk(id, {
            include: [
                { model: CargoMap, as: 'cargo' },
                { model: TelefoneMap, as: 'telefones' }
            ]
        });
    }

    async listarTodos() {
        return await FuncionarioMap.findAll({
            include: [{ model: CargoMap, as: 'cargo' }]
        });
    }

    async buscarPorNome(nome: string) {
        return await FuncionarioMap.findAll({
            where: {
                nomeFuncionario: {
                    [Op.like]: `%${nome}%`
                }
            }
        })
    }

    async criarFuncionario(dados: IFuncionario) {
        return await FuncionarioMap.create(dados);
    }

    async atualizarFuncionario(id: string, dados: any) {
        return await FuncionarioMap.update(dados, {
            where: { idFuncionario: id }
        });
    }

    async apagarFuncionario(id: string) {
        return await FuncionarioMap.destroy({
            where: { idFuncionario: id }
        });
    }
}