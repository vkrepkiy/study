alter table dbo.product
add
    Crypt_name_product varbinary(max)

go

update dbo.product
set Crypt_name_product = EncryptByCert(cert_id('petrovCert'), name_product)

go

SELECT TOP (100)
    *
FROM dbo.product