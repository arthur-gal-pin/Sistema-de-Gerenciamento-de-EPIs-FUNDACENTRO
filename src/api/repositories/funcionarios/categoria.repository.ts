import { CategoriaMap } from '../../mappings';
import { ICategoria } from '../../models/epis/Categoria';
import { Op } from 'sequelize';

export class CategoriaRepository {

    static async listarTodos() {
        return await CategoriaMap.findAll();
    }

    static async listarPorNome(nome: string) {
        return await CategoriaMap.findAll({
            where: {
                nomeCategoria: {
                    [Op.like]: `%${nome}%`
                }
            }
        });
    }

    static async listarPorId(id: string) {
        return await CategoriaMap.findByPk(id);
    }

    static async criarCategoria(dados: ICategoria) {
        return await CategoriaMap.create(dados);
    }

    static async atualizarCategoria(id: string, dados: any) {
        return await CategoriaMap.update(dados, {
            where: { idCategoria: id }
        });
    }

    static async apagarCategoria(id: string) {
        return await CategoriaMap.destroy({
            where: { idCategoria: id }
        });
    }
}