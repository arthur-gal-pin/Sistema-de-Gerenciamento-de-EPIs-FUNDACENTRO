import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../configs/Database';
import { enumSituacaoEmpregaticia } from '../../enum/funcionarios/situacaoEmpregaticia'; 

interface FuncionarioAttributes {
    idFuncionario?: string;
    FK_IdCargo: string;
    nomeFuncionario: string;
    sobrenomeFuncionario?: string;
    senhaHash: string;
    cpf: string;
    email: string;
    vinculoImagem: string;
    situacaoEmpregaticia: enumSituacaoEmpregaticia;
}

interface FuncionarioCreationAttributes extends Optional<FuncionarioAttributes, 'idFuncionario'> {}

class FuncionarioMap extends Model<FuncionarioAttributes, FuncionarioCreationAttributes> implements FuncionarioAttributes {
    public idFuncionario?: string;
    public FK_IdCargo!: string;
    public nomeFuncionario!: string;
    public sobrenomeFuncionario?: string;
    public senhaHash!: string;
    public cpf!: string;
    public email!: string;
    public vinculoImagem!: string;
    public situacaoEmpregaticia!: enumSituacaoEmpregaticia;
}

FuncionarioMap.init(
    {
        idFuncionario: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Gera o UUID automaticamente se não for enviado
            primaryKey: true,
            field: 'IdFuncionario'
        },
        FK_IdCargo: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'FK_IdCargo',
            references: { model: 'Cargos', key: 'IdCargo' }
        },
        nomeFuncionario: {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: 'NomeFuncionario'
        },
        sobrenomeFuncionario: {
            type: DataTypes.STRING(200),
            allowNull: false,
            field: 'SobrenomeFuncionario'
        },
        senhaHash: {
            type: DataTypes.CHAR(60),
            allowNull: false,
            field: 'Senha'
        },
        cpf:{
            type: DataTypes.CHAR(11),
            allowNull: false,
            unique: true,
            field: 'CPF'
        },
        email: { 
            type: DataTypes.STRING(255), 
            allowNull: false, 
            unique: true, 
            field: 'Email' 
        },
        vinculoImagem: { 
            type: DataTypes.STRING(255), 
            allowNull: true, 
            field: 'CaminhoImagemPerfil' 
        },
        situacaoEmpregaticia: { 
            type: DataTypes.ENUM('Ativo', 'Inativo', 'Afastado'), 
            allowNull: false,
            field: 'SituacaoEmpregaticia'
        }
    },
    {
        sequelize,
        tableName: 'TB_FUNCIONARIOS',
        schema: 'dbo',
        timestamps: true,
        createdAt: 'DataCad',
        updatedAt: 'DataMod'
    }
);

export { FuncionarioMap, FuncionarioAttributes };