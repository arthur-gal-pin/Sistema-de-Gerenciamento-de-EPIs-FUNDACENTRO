import { poolPromise, sql } from "../configs/Database";
import { Cargo } from "../models/funcionarios/Cargo";

export class CargoRepository {
    async create(c: Cargo): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('NomeCargo', sql.VarChar, c.nomeCargo)
            .input('NivelPermissao', sql.VarChar, c.nivelPermissao)
            .query(`
            INSERT INTO Cargos(NomeCargo, NivelPermissao) VALUES (@NomeCargo, @NivelPermissao)
            `);
    };

    async readAll(): Promise<Cargo[] | null> {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT * FROM Cargos`);
        if (result.recordset.length === 0) return null;

        return result.recordset.map(row => Cargo.create(row));
    };

    async readById(id: string): Promise<Cargo | null> {
        const pool = await poolPromise;
        const result = await pool.request().input(`Id`, sql.VarChar, id).query(`SELECT * FROM Cargos WHERE IdCargo = @id`);
        if (result.recordset.length === 0) return null;

        return Cargo.create(result.recordset[0]);
    };

    async readByName(nome: string): Promise<Cargo | null> {
        const pool = await poolPromise;
        const result = await pool.request().input(`Nome`, sql.VarChar).query(`SELECT * FROM Cargos WHERE NomeCargo LIKE '%@Nome%'`);
        if (result.recordset.length == 0) return null;

        return Cargo.create(result.recordset[0]);
    };

    async update(c: Cargo): Promise<boolean> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('nome', sql.VarChar, c.nomeCargo)
            .input('nivel', sql.VarChar, c.nivelPermissao)
            .input('id', sql.UniqueIdentifier, c.idCargo)
            .query(`
                UPDATE Cargos 
                SET NomeCargo = @nome, 
                    NivelPermissao = @nivel, 
                    dataMod = GETDATE()
                WHERE idFuncionario = @id
            `);

        return result.rowsAffected[0] > 0;
    }

    async delete(id: string): Promise<boolean> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .query('DELETE FROM Cargos WHERE idCargos = @id');

        return result.rowsAffected[0] > 0;
    }
}