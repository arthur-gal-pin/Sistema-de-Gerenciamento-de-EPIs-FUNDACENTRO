import { CargoMap } from "../../mappings";
import { CargoAttributes } from "../../mappings/funcionarios/cargo.map";
import { Op, where } from 'sequelize'; 

export class CargoRepository {
    async listarTodos() {
        return await CargoMap.findAll();
    }

    async buscarPorId(id: string) {
        return await CargoMap.findByPk(id);
    };

    async criar(dados: CargoAttributes) {
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