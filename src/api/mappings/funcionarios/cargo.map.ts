import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../configs/Database';
import { enumNivelPermissao } from '../../enum/funcionarios/nivelPermissao.enum';

interface CargoAttributes {
    idCargo?: string;
    nomeCargo: string;
    descricao?: string;
    nivelPermissao: enumNivelPermissao;
}

// O id_cargo é opcional na criação pois o Sequelize/Banco irá gerar
interface CargoCreationAttributes extends Optional<CargoAttributes, 'idCargo'> {}

class CargoMap extends Model<CargoAttributes, CargoCreationAttributes> implements CargoAttributes {
    public idCargo!: string;
    public nomeCargo!: string;
    public descricao?: string;
    public nivelPermissao!: enumNivelPermissao;
}

CargoMap.init(
    {
        idCargo: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Gera o UUID automaticamente se não for enviado
            primaryKey: true,
            field: 'IdCargo'
        },
        nomeCargo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'NomeCargo'
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'DescricaoCargo'
        },
        nivelPermissao: {
            type: DataTypes.ENUM('administrador','coordenador', 'funcionario','visitante'),
            allowNull: false,
            field: 'NivelPermissao'
        }
    },
    {
        sequelize,
        tableName: 'TB_CARGOS',
        schema: 'dbo',
        timestamps: true,
        createdAt: 'DataCad',
        updatedAt: 'DataMod'
    }
);

export { CargoMap, CargoAttributes };