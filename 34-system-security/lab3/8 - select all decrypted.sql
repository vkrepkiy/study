open symmetric key personalCertSymKey2 decryption by certificate personalCert

select
    key_client,
    convert(nvarchar(5), DecryptByKey(Crypt_key_client)) as Decrypted_key_client,
    key_product,
    date_order,
    quantity_order,
    date_sale,
    quantity_sale
from dbo.[order]
where key_client like ('NEWC%')

go

CLOSE ALL SYMMETRIC KEYS