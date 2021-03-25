open symmetric key personalCertSymKey2 decryption by certificate personalCert

declare
@key_client nvarchar(5) = 'NEWC1',
@crypt_key_client varbinary(max);

set @crypt_key_client = EncryptByKey(Key_GUID('personalCertSymKey2'), @key_client)

insert into dbo.[order]
    (key_client, key_product, date_order, date_sale, quantity_sale, Crypt_key_client)
values
    (@key_client, 5, '2020-04-23 00:00:00.000', '2020-04-26 00:00:00.000', 1, @crypt_key_client)

close symmetric key personalCertSymKey2