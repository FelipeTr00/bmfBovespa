DO
$$
    DECLARE
        asset      TEXT;
        asset_list TEXT[] := ARRAY [
            'ABEVO', 'AFS', 'ARB', 'ARS', 'AUD', 'AUS',
            'B3SAO', 'BBASO', 'BBDCP', 'BGI', 'BHIAO',
            'BIT', 'BRI', 'CAD', 'CAN', 'CCM', 'CCROO',
            'CHF', 'CHL', 'CLP', 'CMIGP', 'CNH', 'CNL',
            'CNY', 'COGNO', 'CPM', 'CSNAO', 'D12', 'D13',
            'DAP', 'DAX', 'DCO', 'DDI', 'DI1', 'DIF', 'DII',
            'DIT', 'DOL', 'ELETO', 'ENEVO', 'EQTLO', 'ESX',
            'ETH', 'EUP', 'EUR', 'FRC', 'FRI', 'FRO', 'FRP',
            'GBP', 'GBR', 'GGBRP', 'HSI', 'HYPEO', 'ICF', 'IDI',
            'IMV', 'IND', 'INK', 'ISP', 'ITSAP', 'ITUBP', 'JAP',
            'JBSSO', 'JPY', 'JSE', 'LRENO', 'MEX', 'MGLUO', 'MXN',
            'NOK', 'NTCOO', 'NZD', 'NZL', 'OC1', 'PCARO', 'PETRP',
            'PRIOO', 'PSSAO', 'RENTO', 'RUB', 'SCS', 'SEK', 'SJC',
            'SML', 'SOY', 'SUZBO', 'SWI', 'T10', 'TRY', 'TUQ',
            'USIMA', 'VALEO', 'WD1', 'WDO', 'WEGEO', 'WEU', 'WIN',
            'WSP', 'XFI', 'ZAR'
            ];
    BEGIN
        FOREACH asset IN ARRAY asset_list
            LOOP
                EXECUTE format(
                        'DROP TABLE IF EXISTS %I CASCADE;',
                        lower(asset)
                        );
            END LOOP;
    END
$$;



DO
$$
    DECLARE
        asset      TEXT;
        asset_list TEXT[] := ARRAY [
            'ABEVO', 'AFS', 'ARB', 'ARS', 'AUD', 'AUS',
            'B3SAO', 'BBASO', 'BBDCP', 'BGI', 'BHIAO',
            'BIT', 'BRI', 'CAD', 'CAN', 'CCM', 'CCROO',
            'CHF', 'CHL', 'CLP', 'CMIGP', 'CNH', 'CNL',
            'CNY', 'COGNO', 'CPM', 'CSNAO', 'D12', 'D13',
            'DAP', 'DAX', 'DCO', 'DDI', 'DI1', 'DIF', 'DII',
            'DIT', 'DOL', 'ELETO', 'ENEVO', 'EQTLO', 'ESX',
            'ETH', 'EUP', 'EUR', 'FRC', 'FRI', 'FRO', 'FRP',
            'GBP', 'GBR', 'GGBRP', 'HSI', 'HYPEO', 'ICF', 'IDI',
            'IMV', 'IND', 'INK', 'ISP', 'ITSAP', 'ITUBP', 'JAP',
            'JBSSO', 'JPY', 'JSE', 'LRENO', 'MEX', 'MGLUO', 'MXN',
            'NOK', 'NTCOO', 'NZD', 'NZL', 'OC1', 'PCARO', 'PETRP',
            'PRIOO', 'PSSAO', 'RENTO', 'RUB', 'SCS', 'SEK', 'SJC',
            'SML', 'SOY', 'SUZBO', 'SWI', 'T10', 'TRY', 'TUQ',
            'USIMA', 'VALEO', 'WD1', 'WDO', 'WEGEO', 'WEU', 'WIN',
            'WSP', 'XFI', 'ZAR'
            ];
    BEGIN
        FOREACH asset IN ARRAY asset_list
            LOOP
                EXECUTE format(
                        'CREATE TABLE IF NOT EXISTS %I (
                            data DATE NOT NULL,
                            vencto VARCHAR(10) NOT NULL,
                            preco_abert NUMERIC(10,2),
                            preco_min NUMERIC(10,2),
                            preco_max NUMERIC(10,2),
                            preco_med NUMERIC(10,2),
                            ult_preco NUMERIC(10,2),
                            ajuste NUMERIC(10,2),
                            var_ptos NUMERIC(10,2),
                            ult_of_compra NUMERIC(10,2),
                            ult_of_venda NUMERIC(10,2),
                            contr_abert NUMERIC,
                            contr_fech NUMERIC,
                            num_negoc NUMERIC,
                            contr_negoc NUMERIC,
                            vol NUMERIC,
                            PRIMARY KEY (data, vencto)
                        );',
                        lower(asset)
                        );
            END LOOP;
    END
$$;


-- Table assets bmfbovespa
DROP TABLE IF EXISTS assets;
CREATE TABLE assets
(
    id          SERIAL PRIMARY KEY,
    cod         VARCHAR(10) UNIQUE NOT NULL,
    description TEXT               NOT NULL
);
-- Insert assets
INSERT INTO assets (cod, description)
VALUES ('ABEVO', 'Contrato Futuro de ABEV3'),
       ('AFS', 'Rande da África do Sul (em USD)'),
       ('ARB', 'Peso Argentino (em Reais)'),
       ('ARS', 'Peso Argentino (em USD)'),
       ('AUD', 'Dólar Australiano (em Reais)'),
       ('AUS', 'Dólar Australiano (em USD)'),
       ('B3SAO', 'Contrato Futuro de B3SA3'),
       ('BBASO', 'Contrato Futuro de BBAS3'),
       ('BBDCP', 'Contrato Futuro de BBDC4'),
       ('BGI', 'Boi gordo'),
       ('BHIAO', 'Contrato Futuro de BHIA3'),
       ('BIT', 'Futuro de Bitcoin'),
       ('BRI', 'Futuro do Índice Brasil 50'),
       ('CAD', 'Dólar Canadense (em Reais)'),
       ('CAN', 'Dólar Canadense (em USD)'),
       ('CCM', 'Milho'),
       ('CCROO', 'Contrato Futuro de CCRO3'),
       ('CHF', 'Franco Suíço (em Reais)'),
       ('CHL', 'Peso Chileno (em USD)'),
       ('CLP', 'Peso Chileno (em Reais)'),
       ('CMIGP', 'Contrato Futuro de CMIG4'),
       ('CNH', 'Iuan Chinês Offshore (em USD)'),
       ('CNL', 'Café conillon'),
       ('CNY', 'Iuan Chinês Onshore (em Reais)'),
       ('COGNO', 'Contrato Futuro de COGNO'),
       ('CPM', 'CPM – Copom'),
       ('CSNAO', 'Contrato Futuro de CSNA3'),
       ('D12', 'DI - DI de um dia - séries tipo 2'),
       ('D13', 'DI - DI de um dia - séries tipo 3'),
       ('DAP', 'Cupom de DI x IPCA'),
       ('DAX', 'Contrato Futuro de DAX'),
       ('DCO', 'Cupom Cambial em OC1'),
       ('DDI', 'Cupom cambial'),
       ('DI1', 'DI de 1 dia'),
       ('DIF', 'EDS de DI1 (PU Neutro)'),
       ('DII', 'EDS de DI1 (DV01 Neutro)'),
       ('DIT',
        'Trade at Settlement de Futuro de DI (DIT)'),
       ('DOL', 'Dólar comercial'),
       ('ELETO', 'Contrato Futuro de ELET3'),
       ('ENEVO', 'Contrato Futuro de ENEV3'),
       ('EQTLO', 'Contrato Futuro de EQTL3'),
       ('ESX', 'Contrato Futuro de EURO STOXX 50'),
       ('ETH', 'Etanol Hidratado'),
       ('EUP', 'Euro (em USD)'),
       ('EUR', 'Euro (em Reais)'),
       ('FRC', 'FRA de cupom'),
       ('FRI', 'EDS de FRC (DV01 Neutro)'),
       ('FRO', 'FRA de Cupom Cambial em OC1'),
       ('FRP', 'Forward points'),
       ('GBP', 'Libra Esterlina (em Reais)'),
       ('GBR', 'Libra Esterlina (em USD)'),
       ('GGBRP', 'Contrato Futuro de GGBR4'),
       ('HSI',
        'Contrato Futuro de Índice BVMF Hang Seng'),
       ('HYPEO', 'Contrato Futuro de HYPE3'),
       ('ICF', 'Café Arábica 4/5'),
       ('IDI', 'Índice IDI'),
       ('IMV', 'Contrato Futuro de Indice Merval'),
       ('IND', 'Ibovespa'),
       ('INK', 'Contrato Futuro de Indice Nikkei'),
       ('ISP', 'S&P 500'),
       ('ITSAP', 'Contrato Futuro de ITSA4'),
       ('ITUBP', 'Contrato Futuro de ITUB4'),
       ('JAP', 'Iene Japonês (em USD)'),
       ('JBSSO', 'Contrato Futuro de JBSS3'),
       ('JPY', 'Iene Japonês (em Reais)'),
       ('JSE',
        'Contrato Futuro de Índice BVMF FTSE/JSE TOP 40'),
       ('LRENO', 'Contrato Futuro de LREN3'),
       ('MEX', 'Peso Mexicano (em USD)'),
       ('MGLUO', 'Contrato Futuro de MGLU3'),
       ('MXN', 'Peso Mexicano (em Reais)'),
       ('NOK', 'Coroa Norueguesa (em USD)'),
       ('NTCOO', 'Contrato Futuro de NTCO3'),
       ('NZD', 'Dólar da Nova Zelândia (em Reais)'),
       ('NZL', 'Dólar da Nova Zelândia (em USD)'),
       ('OC1', 'Contrato Futuro de OC1'),
       ('PCARO', 'Contrato Futuro de PCAR3'),
       ('PETRP', 'Contrato Futuro de PETR4'),
       ('PRIOO', 'Contrato Futuro de PRIO3'),
       ('PSSAO', 'Contrato Futuro de PSSA3'),
       ('RENTO', 'Contrato Futuro de RENT3'),
       ('RUB', 'Rublo Russo (em USD)'),
       ('SCS', 'Swap Cambial (OC1)'),
       ('SEK', 'Coroa Sueca (em USD)'),
       ('SJC', 'Soja Financeira Cross Listing'),
       ('SML', 'Contrato Futuro de Small Cap'),
       ('SOY', 'Soja FOB Santos'),
       ('SUZBO', 'Contrato Futuro de SUZB3'),
       ('SWI', 'Franco Suíço (em USD)'),
       ('T10', 'US T-Note 10 anos'),
       ('TRY', 'Lira Turca (em Reais)'),
       ('TUQ', 'Lira Turca (em USD)'),
       ('USIMA', 'Contrato Futuro de USIM5'),
       ('VALEO', 'Contrato Futuro de VALE3'),
       ('WD1', 'Rolagem de Mini Dólar'),
       ('WDO', 'Dólar Mini - WDO'),
       ('WEGEO', 'Contrato Futuro de WEGE3'),
       ('WEU', 'EURO MÍNI'),
       ('WIN', 'Ibovespa Mini'),
       ('WSP', 'Microcontrato Futuro de S&P 500'),
       ('XFI', 'Futuro de IFIX'),
       ('ZAR', 'Rande da África do Sul (em Reais)');




