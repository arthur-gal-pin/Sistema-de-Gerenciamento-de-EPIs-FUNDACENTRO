import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../configs/Database';
import { enumTipoTelefone } from '../../enum/funcionarios/tipoTelefone';

interface TelefoneAttributes {
    idTelefone?: string;
    FK_idFuncionario: string;
    numeroTelefone: string;
    tipoTelefone: enumTipoTelefone;
}

interface TelefoneCreationAttributes extends Optional<TelefoneAttributes, 'idTelefone'> {}

class TelefoneMap extends Model<TelefoneAttributes, TelefoneCreationAttributes> implements TelefoneAttributes {
    public idTelefone!: string;
    public FK_idFuncionario!: string;
    public numeroTelefone!: string;
    public tipoTelefone!: enumTipoTelefone;
}

TelefoneMap.init(
    {
        idTelefone: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Gera o UUID automaticamente se não for enviado
            primaryKey: true,
            field: 'IdCargo'
        },
        FK_idFuncionario: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'FK_IdFuncionario',
            references: {model: 'Funcionarios', key:'IdFuncionario'}
        },
        numeroTelefone: {
            type: DataTypes.STRING(13),
            allowNull: true,
            field: 'NumeroTelefone'
        },
        tipoTelefone: {
            type: DataTypes.ENUM('fixo','movel', 'trabalho'),
            allowNull: false,
            field: 'TipoTelefone'
        }
    },
    {
        sequelize,
        tableName: 'TB_TELEFONES',
        schema: 'dbo',
        timestamps: true,
        createdAt: 'DataCad',
        updatedAt: 'DataMod'
    }
);

export { TelefoneMap };