import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../configs/Database';
import { enumNivelPermissao } from '../../enum/funcionarios/nivelPermissao.enum';
import { ICargo } from '../../models/funcionarios/Cargo';

interface CargoCreationAttributes extends Optional<ICargo, 'idCargo' | 'dataCad' | 'dataMod'> {}

class CargoMap extends Model<ICargo, CargoCreationAttributes> implements ICargo {
    public idCargo!: string | null; 
    public nomeCargo!: string;
    public nivelPermissao!: enumNivelPermissao;
    public dataCad?: string;
    public dataMod?: string;
}

CargoMap.init(
    {
        idCargo: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'IdCargo'
        },
        nomeCargo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'NomeCargo'
        },
        nivelPermissao: {
            type: DataTypes.ENUM(...Object.values(enumNivelPermissao)),
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

export { CargoMap };