import mssql from 'mssql'; // Adicionado 'mssql' aqui
import 'dotenv/config';

// Validação das variáveis de ambiente
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
    throw new Error('Faltando variáveis críticas para o banco de dados SQL Server.');
}

// Configuração do SQL Server
const sqlConfig: mssql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 1433,
    pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, 
        trustServerCertificate: true,
    }
};

class Database {
    private static instance: Database | null = null;
    private pool: mssql.ConnectionPool; 

    private constructor(pool: mssql.ConnectionPool) {
        this.pool = pool;
    }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            try {
                // Cria e conecta o pool antes de instanciar a classe
                const pool = await new mssql.ConnectionPool(sqlConfig).connect();
                console.log('Pool de conexão com SQL Server estabelecido.');

                // Tratamento de erros no pool
                pool.on('error', err => {
                    console.error('Erro no pool do SQL Server:', err);
                });

                Database.instance = new Database(pool);
            } catch (err) {
                console.error('Falha ao criar o pool de conexão:', err);
                throw err;
            }
        }
        return Database.instance;
    }

    public getPool(): mssql.ConnectionPool {
        return this.pool;
    }
}

export const connectionPromise = Database.getInstance().then(db => db.getPool());
