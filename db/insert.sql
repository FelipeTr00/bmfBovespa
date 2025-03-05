INSERT INTO {asset} (
    data, vencto, preco_abert, preco_min, preco_max, preco_med,
    ult_preco, ajuste, var_ptos, ult_of_compra, ult_of_venda,
    contr_abert, contr_fech, num_negoc, contr_negoc, vol
) VALUES 
{values_placeholder}
ON CONFLICT (data, vencto) DO NOTHING;