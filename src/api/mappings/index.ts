import { CargoMap } from "./funcionarios/cargo.map";
import { FuncionarioMap } from "./funcionarios/funcionario.map";
import { TelefoneMap } from "./funcionarios/telefone.map";

// 1 Cargo tem N Funcionários
CargoMap.hasMany(FuncionarioMap, { foreignKey: 'fk_id_cargo', as: 'funcionarios' });
FuncionarioMap.belongsTo(CargoMap, { foreignKey: 'fk_id_cargo', as: 'cargo' });

// 1 Funcionário tem N Telefones
FuncionarioMap.hasMany(TelefoneMap, { foreignKey: 'fk_id_funcionario', as: 'telefones' });
TelefoneMap.belongsTo(FuncionarioMap, { foreignKey: 'fk_id_funcionario', as: 'funcionario' });

export { CargoMap, FuncionarioMap, TelefoneMap };