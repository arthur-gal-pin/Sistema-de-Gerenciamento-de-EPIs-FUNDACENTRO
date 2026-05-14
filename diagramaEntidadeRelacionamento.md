# Documentação do Banco de Dados

Esta documentação descreve a estrutura do banco de dados baseada no Diagrama de Entidade-Relacionamento (DER) fornecido. O sistema parece ser voltado para a gestão de ensaios laboratoriais, amostras, funcionários e relatórios.

## 1. Visão Geral
O banco de dados utiliza UUIDs como chaves primárias e mantém campos de auditoria (DataCad para cadastro e DataMod para modificação) em todas as tabelas.

---

## 2. Dicionário de Dados

### 2.1. Tabela: FUNCIONARIOS
Armazena as informações dos colaboradores do sistema.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdFuncionario | UUID | PK | Identificador único do funcionário. |
| FK_IdCargo | UUID | FK | Referência ao cargo do funcionário. |
| NomeFuncionario | VARCHAR(30) | NN | Primeiro nome. |
| SobrenomeFuncionario | VARCHAR(200) | NN | Sobrenome completo. |
| Cpf | CHAR(11) | NN | Cadastro de Pessoa Física. |
| SenhaHash | VARCHAR(255) | NN | Hash da senha para autenticação. |
| Email | VARCHAR(255) | NN | Endereço de e-mail institucional. |
| CaminhoImagemPerfil | VARCHAR(255) | NN | Caminho do arquivo de imagem de perfil. |
| SituacaoEmpregaticia | ENUM | Ativo, Inativo | Status |
| DataCad | DATETIME | | Data de criação do registro. |
| DataMod | DATETIME | | Data da última alteração. |

**Funcionário → Ensaio(1:N)**: Um funcionário pode realizar vários ensaios (1:N).
**Funcionários → Relatórios (1:N)**: Um funcionário pode ser o responsável pela emissão ou validação de **vários** relatórios.

### 2.2. Tabela: CARGOS
Define as funções e níveis de acesso.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdCargo | UUID | PK | Identificador único do cargo. |
| NomeCargo | VARCHAR(255) | NN | Descrição do cargo. |
| NivelPermissao | ENUM |     administrador, coordenador, funcionario, visitante | Nível hierárquico de acesso ao sistema. |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação. |

**Cargo → Funcionário(0:N)**: Um cargo pode ser atribuído a vários funcionários.

### 2.3. Tabela: ENSAIOS
Registro principal das atividades laboratoriais.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdEnsaio | UUID | PK | Identificador único do ensaio. |
| FK_IdFuncionario | UUID | FK | Funcionário responsável pelo ensaio. |
| FK_IdAmostra | UUID | FK | Amostra que está sendo testada. |
| FK_IdTipoEnsaio | UUID | FK | Categoria/Procedimento do ensaio. |
| DiaProgramado | DATE | NN | Data prevista para o ensaio. |
| DiaRealizado | DATE | | Data em que o ensaio ocorreu. |
| Testemunha | VARCHAR(255) | NN | Nome da pessoa que presenciou o ensaio. |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação. |

**Ensaios → Relatórios(1:N)**: Um ensaio pode estar em vários relatórios e vice-versa (N:N), resolvido pela tabela ENSAIOS_RELATÓRIO.

### 2.4. Tabela: DADOS_ENSAIO
Armazena os resultados específicos colhidos durante um ensaio.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdDadosEnsaio | UUID | PK | Identificador do dado. |
| FK_IdTipoEnsaio | UUID | FK | Referência ao tipo de ensaio. |
| FK_IdEnsaio | UUID | FK | Referência ao ensaio pai. |
| NomeDado | VARCHAR(80) | NN | Nome do dado específico para referência |
| DadoNumerico | DECIMAL(10,2) | | Valor numérico medido. |
| DadoFrase | VARCHAR(255) | | Observação textual. |
| DadoBoolean | BOOLEAN | | Resultado booleano. |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação. |

Os campos de Dado não precisam ter um valor necessariamente, apenas um deles.

### 2.5. Tabela: TIPO_ENSAIO
Configuração dos tipos de ensaios disponíveis.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdTipoEnsaio | UUID | PK | Identificador do tipo. |
| FK_IdInstrumento | UUID | FK | Instrumento principal utilizado. |
| NomeEnsaio | VARCHAR(255) | NN | Nome do procedimento. |
| DescricaoEnsaio | VARCHAR(255) | NN | Detalhes sobre o ensaio. |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação.|

**Tipo de Ensaio → Ensaios (1:N)**: O TIPO_ENSAIO funciona como um "template". Um único tipo define as diretrizes para **muitos** ensaios executados.
**Tipo de Ensaio → Dados(0:N)**: Um tipo de ensaio define a estrutura de vários registros de dados (1:N).

### 2.6. Tabela: AMOSTRAS
Informações sobre os itens enviados para teste.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdAmostra | UUID | PK | Identificador da amostra. |
| FK_IdOCP | UUID | FK | Referência ao Organismo de Certificação de Produto. |
| FK_IdEmpresa | UUID | FK | Empresa proprietária da amostra. |
| NomeAmostra | VARCHAR(255) | NN | Nome identificador. |
| TipoAmostra | ENUM | Prova,ContraProva, Testemunha | Categoria da amostra. |
| SituacaoAmostra | ENUM | Em teste, Finalizada | Estado atual. |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação. |

**Amostra → Ensaio(1:N)**: Uma amostra pode passar por diversos ensaios (1:N).
**Empresa/OCP → Amostras (1:N)**: Empresas e OCPs podem enviar diversas amostras (1:N).

### 2.7. Tabela: INSTRUMENTO
Equipamentos utilizados nos ensaios.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdInstrumento | UUID | PK | Identificador do instrumento. |
| NomeInstrumento | VARCHAR(50) | NN | Nome do equipamento. |
| FuncaoInstrumento | VARCHAR(255) | NN | Para que serve o equipamento. |
| UltimaCalibracao | DATE | | Data da última manutenção/calibração. |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação. |

**Instrumento → Tipo de Ensaio (1:N)**: Um tipo de ensaio específico é configurado para utilizar um determinado **Instrumento** (equipamento). Garante que o ensaio seja realizado apenas com equipamentos calibrados e adequados.

### 2.8. Tabela: RELATÓRIOS
Documentos gerados a partir dos ensaios.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdRelatorio | UUID | PK | Identificador do relatório. |
| FK_IdFuncionario | UUID | FK | Funcionário que gerou/validou o relatório. |
| CaminhoRelatorio | VARCHAR(255) | | Localização do arquivo (PDF/Doc). |
| StatusRelatorio | ENUM | Pendente, Assinado | Status |
| DataCad | DATETIME | | Data de criação. |
| DataMod | DATETIME | | Data de modificação. |

## Ensaios ↔ Relatórios (N:N)
**Regra:** Relacionamento de muitos-para-muitos.
    * Um **Ensaio** pode aparecer em diferentes relatórios (ex: relatório parcial e relatório final).
    * Um **Relatório** pode consolidar os dados de diversos **Ensaios**.
**Resolução:** Implementado através da tabela associativa ENSAIOS_RELATÓRIO.

### 2.9. Tabela: ENSAIOS_RELATÓRIO (Tabela Intermediária)
Faz o vínculo entre ensaios e relatórios.

| Campo | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| IdEnsaio | UUID | PK, FK | Referência ao ensaio. |
| IdRelatorio | UUID | PK, FK | Referência ao relatório. |
| DataCad | DATETIME | | Registro de auditoria. |
| DataMod | DATETIME | | Registro de auditoria. |

### 2.10. Outras Tabelas

**EMPRESA**: Cadastro de clientes/empresas solicitantes (NomeEmpresa).
**OCP**: Cadastro de Organismos de Certificação de Produto (NomeOCP).
**TELEFONES**: Armazena múltiplos números de telefone por funcionário (NumeroTelefone, TipoTelefone).
**REGISTRO_ACESSO**: Log de auditoria de navegação dos funcionários (Data, Hora, PaginaAcesso).

---