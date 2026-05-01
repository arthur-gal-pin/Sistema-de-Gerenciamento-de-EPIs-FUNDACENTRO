import sql from 'mssql';

// Configurações do Banco de Dados
const config: sql.config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'SuaSenhaForte123',
    server: process.env.DB_SERVER || 'localhost', 
    database: process.env.DB_NAME || 'EmpresaDB',
    options: {
        encrypt: true, // Use true se estiver a usar Azure
        trustServerCertificate: true, // Necessário para desenvolvimento local (self-signed certs)
        enableArithAbort: true
    },
    pool: {
        max: 10, // Máximo de conexões simultâneas no pool
        min: 0,
        idleTimeoutMillis: 30000 // Tempo para fechar conexões inativas
    }
};


export const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Conectado ao Microsoft SQL Server com sucesso!');
        return pool;
    })
    .catch(err => {
        console.error('❌ Erro ao criar Connection Pool:', err);
        throw err;
    });

// Exportamos também o objeto sql para usar os tipos (sql.Int, sql.VarChar, etc) nos Repositories
export { sql };