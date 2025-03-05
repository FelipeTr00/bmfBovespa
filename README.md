<h1 align="center">BMFBovespa Web Miner</h1>

## Autor: Felipe Morais.

Este projeto realiza a mineração de dados da [**BMF&Bovespa**](https://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1/SistemaPregao1.asp)  !

Utilizando **TypeScript**, **NodeJS**, **Docker** e **PostgreSQL**, o sistema busca e armazena dados de ativos do mercado futuro, permitindo análises e acompanhamento detalhado das informações financeiras.

## Tecnologias Utilizadas

<p align="center">
  <img src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Postgresql.svg" alt="PostgreSQL" width="100">
  <img src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Typescript.svg" alt="TypeScript" width="100">
  <img src="https://github.com/gui-bus/TechIcons/blob/main/Dark/NodeJS.svg" alt="Node.js" width="100">
  <img src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Docker.svg" alt="Docker" width="100">
</p>

<p align="center">
  <strong>PostgreSQL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TypeScript &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NodeJS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Docker</strong>
</p>


## Rotas da API

- **GET /api**  
  Retorna a versão da API.\
  **Req**
  ```
      curl -X GET http://localhost:3000/api
  ```
  **Res**
  ```
    {
      "project": "api-bmfbovespa",
      "author": "Felipe Morais"
    }
  
  ```
  ---
- **GET /api/list**  
  Retorna a lista de ativos disponíveis.  

  **Req**  
  ```sh
  curl -X GET http://localhost:3000/api/list
  ```
  **Res**
  ```
  [
   {
     "id": 1,
     "cod": "ABEVO",
     "description": "Contrato Futuro de ABEV3"
   },
   {
     "id": 2,
     "cod": "AFS",
     "description": "Rande da África do Sul (em USD)"
   },
   {
      "id": 3,
     "cod": "ARB",
      "description": "Peso Argentino (em Reais)"
    },
    ... continua ...
  ]
  ```

  ---

- **GET /api/asset/:asset**  
  Retorna dados da tabela de ativos com base no parâmetro `:asset`.

  **Req**
  ```
      //Asset exemplo: bgi (Boi Gordo)
      curl -X GET http://localhost:3000/api/asset/:asset
  ```
  **Res**

   ```
  [
  {
    "data": "2025-01-02T03:00:00.000Z",
    "vencto": "F25",
    "preco_abert": "317.35",
    "preco_min": "315.50",
    "preco_max": "323.10",
    "preco_med": "320.18",
    "ult_preco": "321.50",
    "ajuste": "322.20",
    "var_ptos": "6.55",
    "ult_of_compra": "321.50",
    "ult_of_venda": "321.90",
    "contr_abert": "13317",
    "contr_fech": "13107",
    "num_negoc": "1414",
    "contr_negoc": "2255",
    "vol": "238265395"
  }, ... continua ...

  ```
  ---
  

- **POST /api/miner**  
  Executa a mineração dos dados.  
  Body:
  ```json
  {
    "ativo": "BGI",
    "referenceDate": "2025-01-01",
    "referenceDateFinal": "2025-02-01"
  }
  ```
  **Req**
  ```
    curl -X POST https://seu-dominio.com/api/miner \
     -H "Content-Type: application/json" \
     -d '{
           "ativo": "BGI",
           "referenceDate": "2025-01-01",
           "referenceDateFinal": "2025-02-01"
         }'
  ```
  
  **Res**
  ```
    {
	 "message": "Requisição em processamento."
    }
     ...
    {
	 "message": "Mineração finalizada com sucesso."
    }
  ```
---
## Estrutura de pastas

```
  bmfBovespa/
├── data/                      # Diretório para armazenamento de dados extraídos ou processados
├── db/                        # Configuração e scripts do banco de dados PostgreSQL
├── src/                       # Código-fonte principal do projeto
│   ├── bmfbovespa/            # Módulo principal de mineração dos ativos da BMF&Bovespa
│   ├── db/                    # Conexão e operações relacionadas ao banco de dados
│   ├── routes/                # Definição das rotas da API
│   ├── server/                # Configuração do servidor Node.js (Express)
│   ├── parsejson/             # Processamento e transformação de dados JSON extraídos
│   ├── utilcalendar/          # Funções utilitárias para manipulação de datas e feriados
│   ├── miner/                 # Lógica de mineração dos dados da BMF&Bovespa
├── test/                      # Testes unitários e de integração do projeto
├── .gitignore                 # Arquivo que especifica arquivos e diretórios a serem ignorados pelo Git
├── README.md                  # Documentação do projeto
├── docker-compose.yml          # Configuração do Docker Compose para serviços do projeto
├── index.ts                   # Arquivo principal de inicialização do projeto
├── package-lock.json           # Registro exato das versões das dependências
├── package.json                # Metadados do projeto e lista de dependências
└── tsconfig.json               # Configuração do compilador TypeScript


```

---

## Executando o Projeto

1️⃣ Instale as dependências:
```
   npm install -y
```

2️⃣ Suba o container Docker e inicie o Banco de Dados:
```
   docker compose up -d
```
Obs.: (O parâmetro `-d` executa os containers em segundo plano)

3️⃣ Criar as tabelas no Banco de Dados:
```
    psql -U SEU_USUARIO -d SEU_BANCO -f bmfbovespa/db/schema.sql
```
4️⃣ Variáveis de ambiente (.env):
```
  POSTGRES_DB=postgres
  POSTGRES_USER=bmfbovespa
  POSTGRES_PASSWORD=1234
  POSTGRES_PORT=5434
  EXTERNAL_PORT=5435
  PORT=3000
```
5️⃣Inicie o servidor:
```
   npm run dev                
```
(O servidor será iniciado em modo de desenvolvimento)

✅ Agora o projeto estará rodando e pronto para ser utilizado! 🚀



---

## Tabela de Ativos - BMFBovespa

| ID  | Código  | Descrição |
|-----|---------|------------------------------------------------|
| 1   | ABEVO   | Contrato Futuro de ABEV3 |
| 2   | AFS     | Rande da África do Sul (em USD) |
| 3   | ARB     | Peso Argentino (em Reais) |
| 4   | ARS     | Peso Argentino (em USD) |
| 5   | AUD     | Dólar Australiano (em Reais) |
| 6   | AUS     | Dólar Australiano (em USD) |
| 7   | B3SAO   | Contrato Futuro de B3SA3 |
| 8   | BBASO   | Contrato Futuro de BBAS3 |
| 9   | BBDCP   | Contrato Futuro de BBDC4 |
| 10  | BGI     | Boi gordo |
| 11  | BHIAO   | Contrato Futuro de BHIA3 |
| 12  | BIT     | Futuro de Bitcoin |
| 13  | BRI     | Futuro do Índice Brasil 50 |
| 14  | CAD     | Dólar Canadense (em Reais) |
| 15  | CAN     | Dólar Canadense (em USD) |
| 16  | CCM     | Milho |
| 17  | CCROO   | Contrato Futuro de CCRO3 |
| 18  | CHF     | Franco Suíço (em Reais) |
| 19  | CHL     | Peso Chileno (em USD) |
| 20  | CLP     | Peso Chileno (em Reais) |
| 21  | CMIGP   | Contrato Futuro de CMIG4 |
| 22  | CNH     | Iuan Chinês Offshore (em USD) |
| 23  | CNL     | Café conillon |
| 24  | CNY     | Iuan Chinês Onshore (em Reais) |
| 25  | COGNO   | Contrato Futuro de COGNO |
| 26  | CPM     | CPM – Copom |
| 27  | CSNAO   | Contrato Futuro de CSNA3 |
| 28  | D12     | DI - DI de um dia - séries tipo 2 |
| 29  | D13     | DI - DI de um dia - séries tipo 3 |
| 30  | DAP     | Cupom de DI x IPCA |
| 31  | DAX     | Contrato Futuro de DAX |
| 32  | DCO     | Cupom Cambial em OC1 |
| 33  | DDI     | Cupom cambial |
| 34  | DI1     | DI de 1 dia |
| 35  | DIF     | EDS de DI1 (PU Neutro) |
| 36  | DII     | EDS de DI1 (DV01 Neutro) |
| 37  | DIT     | Trade at Settlement de Futuro de DI (DIT) |
| 38  | DOL     | Dólar comercial |
| 39  | ELETO   | Contrato Futuro de ELET3 |
| 40  | ENEVO   | Contrato Futuro de ENEV3 |
| 41  | EQTLO   | Contrato Futuro de EQTL3 |
| 42  | ESX     | Contrato Futuro de EURO STOXX 50 |
| 43  | ETH     | Etanol Hidratado |
| 44  | EUP     | Euro (em USD) |
| 45  | EUR     | Euro (em Reais) |
| 46  | FRC     | FRA de cupom |
| 47  | FRI     | EDS de FRC (DV01 Neutro) |
| 48  | FRO     | FRA de Cupom Cambial em OC1 |
| 49  | FRP     | Forward points |
| 50  | GBP     | Libra Esterlina (em Reais) |
| 51  | GBR     | Libra Esterlina (em USD) |
| 52  | GGBRP   | Contrato Futuro de GGBR4 |
| 53  | HSI     | Contrato Futuro de Índice BVMF Hang Seng |
| 54  | HYPEO   | Contrato Futuro de HYPE3 |
| 55  | ICF     | Café Arábica 4/5 |
| 56  | IDI     | Índice IDI |
| 57  | IMV     | Contrato Futuro de Indice Merval |
| 58  | IND     | Ibovespa |
| 59  | INK     | Contrato Futuro de Indice Nikkei |
| 60  | ISP     | S&P 500 |
| 61  | ITSAP   | Contrato Futuro de ITSA4 |
| 62  | ITUBP   | Contrato Futuro de ITUB4 |
| 63  | JAP     | Iene Japonês (em USD) |
| 64  | JBSSO   | Contrato Futuro de JBSS3 |
| 65  | JPY     | Iene Japonês (em Reais) |
| 66  | JSE     | Contrato Futuro de Índice BVMF FTSE/JSE TOP 40 |
| 67  | LRENO   | Contrato Futuro de LREN3 |
| 68  | MEX     | Peso Mexicano (em USD) |
| 69  | MGLUO   | Contrato Futuro de MGLU3 |
| 70  | MXN     | Peso Mexicano (em Reais) |
| 71  | NOK     | Coroa Norueguesa (em USD) |
| 72  | NTCOO   | Contrato Futuro de NTCO3 |
| 73  | NZD     | Dólar da Nova Zelândia (em Reais) |
| 74  | NZL     | Dólar da Nova Zelândia (em USD) |
| 75  | OC1     | Contrato Futuro de OC1 |
| 76  | PCARO   | Contrato Futuro de PCAR3 |
| 77  | PETRP   | Contrato Futuro de PETR4 |
| 78  | PRIOO   | Contrato Futuro de PRIO3 |
| 79  | PSSAO   | Contrato Futuro de PSSA3 |
| 80  | RENT3   | Contrato Futuro de RENT3 |
| 81  | RUB     | Rublo Russo (em USD) |
| 82  | SCS     | Swap Cambial (OC1) |
| 83  | SEK     | Coroa Sueca (em USD) |
| 84  | SJC     | Soja Financeira Cross Listing |
| 85  | SML     | Contrato Futuro de Small Cap |
| 86  | SOY     | Soja FOB Santos |
| 87  | SUZBO   | Contrato Futuro de SUZB3 |
| 88  | SWI     | Franco Suíço (em USD) |
| 89  | T10     | US T-Note 10 anos |
| 90  | TRY     | Lira Turca (em Reais) |
| 91  | TUQ     | Lira Turca (em USD) |
| 92  | USIMA   | Contrato Futuro de USIM5 |
| 93  | VALEO   | Contrato Futuro de VALE3 |
| 94  | WD1     | Rolagem de Mini Dólar |
| 95  | WDO     | Dólar Mini - WDO |
| 96  | WEGEO   | Contrato Futuro de WEGE3 |
| 97  | WEU     | EURO MÍNI |
| 98  | WIN     | Ibovespa Mini |
| 99  | WSP     | Microcontrato Futuro de S&P 500 |
| 100 | XFI     | Futuro de IFIX |
| 101 | ZAR     | Rande da África do Sul (em Reais) |

## Explicação das Colunas

| Nome da Coluna       | Nome no Banco      | Tipo de Dado         | Descrição |
|----------------------|-------------------|---------------------|-----------|
| **VENCTO**           | `vencto`          | `character varying`  | Código do vencimento do contrato futuro (exemplo: F25, G25, H25, etc.). Representa o mês e o ano do vencimento. |
| **CONTR. ABERT.(1)** | `contr_abert`     | `numeric`            | Número de contratos em aberto no mercado. |
| **CONTR. FECH.(2)**  | `contr_fech`      | `numeric`            | Número de contratos fechados no dia. |
| **NÚM. NEGOC.**      | `num_negoc`       | `numeric`            | Número total de negócios realizados. |
| **CONTR. NEGOC.**    | `contr_negoc`     | `numeric`            | Número de contratos negociados. |
| **VOL.**             | `vol`             | `numeric`            | Volume financeiro negociado no dia. |
| **PREÇO ABERT.**     | `preco_abert`     | `numeric`            | Preço de abertura do contrato no dia. |
| **PREÇO MÍN.**       | `preco_min`       | `numeric`            | Preço mínimo atingido no dia. |
| **PREÇO MÁX.**       | `preco_max`       | `numeric`            | Preço máximo atingido no dia. |
| **PREÇO MÉD.**       | `preco_med`       | `numeric`            | Preço médio ponderado das negociações. |
| **ÚLT. PREÇO**       | `ult_preco`       | `numeric`            | Último preço negociado no dia. |
| **AJUSTE**           | `ajuste`          | `numeric`            | Preço de ajuste do contrato para o próximo pregão. |
| **VAR. PTOS.**       | `var_ptos`        | `numeric`            | Variação de pontos do contrato em relação ao ajuste anterior. |
| **ÚLT. OF. COMPRA**  | `ult_of_compra`   | `numeric`            | Última oferta de compra registrada no livro de ofertas. |
| **ÚLT. OF. VENDA**   | `ult_of_venda`    | `numeric`            | Última oferta de venda registrada no livro de ofertas. |

---

Os contratos futuros têm vencimentos específicos, e os preços e volumes variam conforme a liquidez e demanda do mercado.


## Legenda dos Meses dos Contratos Futuros

| Cód. | Mês       | Cód. | Mês       |
|------|----------|------|----------|
| F    | Janeiro  | N    | Julho    |
| G    | Fevereiro | Q    | Agosto   |
| H    | Março    | U    | Setembro |
| J    | Abril    | V    | Outubro  |
| K    | Maio     | X    | Novembro |
| M    | Junho    | Z    | Dezembro |

---

## [**Enjoy 🎵: Red Hot Chili Peppers - Scar Tissue**](https://www.youtube.com/watch?v=mzJj5-lubeM) Red Hot Chili Peppers - Scar Tissue
