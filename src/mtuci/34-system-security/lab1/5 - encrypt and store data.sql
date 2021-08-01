open symmetric key petrovSymKey decryption by password = '!YourStrongPassword'
go
update Sale1.dbo.client
set Crypt_phone = EncryptByKey(Key_GUID('petrovSymKey'), phone)
go
update Sale1.dbo.client
set Crypt_region = EncryptByKey(Key_GUID('petrovSymKey'), region)
go
update Sale1.dbo.client
set Crypt_address = EncryptByKey(Key_GUID('petrovSymKey'), address)
go
update Sale1.dbo.client
set Crypt_name_firm = EncryptByKey(Key_GUID('petrovSymKey'), name_firm)