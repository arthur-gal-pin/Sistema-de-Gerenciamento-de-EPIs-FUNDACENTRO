import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../configs/Database';
import { ICategoria } from '../../models/epis/Categoria';

interface CategoriaCreationAttributes
  extends Optional<ICategoria, 'idCategoria' | 'dataCad' | 'dataMod'> {}

class CategoriaMap
  extends Model<ICategoria, CategoriaCreationAttributes>
  implements ICategoria
{
  public idCategoria!: string | null;
  public nomeCategoria!: string;
  public descricaoCategoria!: string | null;

  // Timestamps
  public readonly dataCad!: Date;
  public readonly dataMod!: Date;
}

CategoriaMap.init(
  {
    idCategoria: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'IdCategoria'
    },

    nomeCategoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'NomeCategoria'
    },

    descricaoCategoria: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'DescricaoCategoria'
    }
  },
  {
    sequelize,
    tableName: 'TB_CATEGORIAS',
    schema: 'dbo',
    timestamps: true,
    createdAt: 'DataCad',
    updatedAt: 'DataMod'
  }
);

export { CategoriaMap };