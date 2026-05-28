import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../configs/Database';

// import { IAmostra } from '../../models/amostras/Amostra';
interface IAmostra {
    idAmostra?: string | null;
    FK_idOCP: string;
    FK_idEmpresa: string;
    nomeAmostra: string;
    tipoAmostra: enumTipoAmostra;
    situacaoAmostra: situacaoAmostra;
    dataCad?: string;
    dataMod?: string;
}

import { enumTipoAmostra } from '../../enum/amostras/tipoAmostra.enum';
import {situacaoAmostra}from '../../enum/amostras/situacaoAmostra.enum';

interface AmostraCreationAttributes extends Optional<IAmostra, 'idAmostra' | 'dataCad' | 'dataMod'> {}

class AmostraMap extends Model<IAmostra, AmostraCreationAttributes> implements IAmostra {

    public idAmostra!: string | null;

    public FK_idOCP!: string;
    public FK_idEmpresa!: string;

    public nomeAmostra!: string;

    public tipoAmostra!: enumTipoAmostra;
    public situacaoAmostra!: situacaoAmostra;

    // Timestamps
    public readonly dataCad!: string;
    public readonly dataMod!: string;
}

AmostraMap.init(
    {
        idAmostra: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'IdAmostra'
        },

        FK_idOCP: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'FK_IdOCP',
            references: {
                model: 'TB_OCP',
                key: 'IdOCP'
            }
        },

        FK_idEmpresa: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'FK_IdEmpresa',
            references: {
                model: 'TB_EMPRESAS',
                key: 'IdEmpresa'
            }
        },

        nomeAmostra: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'NomeAmostra'
        },

        tipoAmostra: {
            type: DataTypes.ENUM(
                'epi',
                'epc'
            ),
            allowNull: false,
            field: 'TipoAmostra'
        },

        situacaoAmostra: {
            type: DataTypes.ENUM(
                'prova',
                'contraprova',
                'testemunha'
            ),
            allowNull: false,
            field: 'SituacaoAmostra'
        }
    },
    {
        sequelize,
        tableName: 'TB_AMOSTRAS',
        schema: 'dbo',
        timestamps: true,
        createdAt: 'DataCad',
        updatedAt: 'DataMod'
    }
);

export { AmostraMap };