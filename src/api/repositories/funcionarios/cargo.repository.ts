import { CargoMap } from "../../mappings";
import { Op } from 'sequelize'; 
import { ICargo } from "../../models/funcionarios/Cargo";

export class CargoRepository {
    async listarTodos() {
        return await CargoMap.findAll();
    }

    async buscarPorId(id: string) {
        return await CargoMap.findByPk(id);
    };

    async criar(dados: ICargo) {
        return await CargoMap.create(dados);
    };

    async buscarPorNome(nome: string){
        return await CargoMap.findAll({
            where: {
                nomeCargo: {
                    [Op.like]: `%${nome}%`
                }
            }
        })
    };

    async removerCargo(id: string) {
        return await CargoMap.destroy({
            where: {
                idCargo: id 
            }
        })
    };
}