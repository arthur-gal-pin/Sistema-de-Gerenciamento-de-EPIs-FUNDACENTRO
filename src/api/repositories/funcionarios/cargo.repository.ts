import mssql from 'mssql';
import { connectionPromise } from '../../configs/Database';
import Cargo from '../../models/funcionarios/Cargo';

const CargoRepository = {

    /**
     * Busca todos os cargos cadastrados.
     */
    async findAll(): Promise<Cargo[]> {
        const pool = await connectionPromise;
        const result = await pool.request().query(`
            SELECT idCargo, nomeCargo, nivelPermissao, dataCad, dataMod 
            FROM CARGOS
        `);
        return result.recordset.map((linha) => Cargo.create(linha));
    },

    /**
     * Busca um cargo pelo UUID.
     */
    async findById(idCargo: string): Promise<Cargo | null> {
        const pool = await connectionPromise;
        const result = await pool.request()
            .input('idCargo', mssql.UniqueIdentifier, idCargo)
            .query(`
                SELECT * FROM CARGOS WHERE idCargo = @idCargo
            `);

        if (result.recordset.length === 0) return null;

        return Cargo.create(result.recordset[0]) || null;
    },

    /**
     * Cria um novo cargo.
     * Nota: O SQL Server pode gerar o UUID via NEWID(), ou você pode enviar do código.
     */
    async create(nomeCargo: string, nivelPermissao: string): Promise<void> {
        const pool = await connectionPromise;
        await pool.request()
            .input('nomeCargo', mssql.VarChar(255), nomeCargo)
            .input('nivelPermissao', mssql.VarChar(50), nivelPermissao)
            .query(`
                INSERT INTO CARGOS (idCargo, nomeCargo, nivelPermissao, dataCad, dataMod)
                VALUES (NEWID(), @nomeCargo, @nivelPermissao, GETDATE(), GETDATE())
            `);
    },

    /**
     * Atualiza o nome ou permissão de um cargo.
     */
    async update(idCargo: string, nomeCargo: string, nivelPermissao: string): Promise<boolean> {
        const pool = await connectionPromise;
        const result = await pool.request()
            .input('idCargo', mssql.UniqueIdentifier, idCargo)
            .input('nomeCargo', mssql.VarChar(255), nomeCargo)
            .input('nivelPermissao', mssql.VarChar(50), nivelPermissao)
            .query(`
                UPDATE CARGOS 
                SET nomeCargo = @nomeCargo, 
                    nivelPermissao = @nivelPermissao, 
                    dataMod = GETDATE()
                WHERE idCargo = @idCargo
            `);

        return (result.rowsAffected[0] > 0);
    },

    /**
     * Remove um cargo (Cuidado com restrições de FK com Funcionários).
     */
    async delete(idCargo: string): Promise<boolean> {
        const pool = await connectionPromise;
        const result = await pool.request()
            .input('idCargo', mssql.UniqueIdentifier, idCargo)
            .query(`
                DELETE FROM CARGOS WHERE idCargo = @idCargo
            `);

        return (result.rowsAffected[0] > 0);
    }
}

export default CargoRepository;