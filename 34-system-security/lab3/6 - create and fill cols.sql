open symmetric key personalCertSymKey2 decryption by certificate personalCert

go

alter table dbo.[order]
add
    Crypt_key_client varbinary(max)

go

update dbo.[order]
set Crypt_key_client = EncryptByKey(key_guid('personalCertSymKey2'), key_client)

go

SELECT TOP (100)
    *
FROM dbo.[order]