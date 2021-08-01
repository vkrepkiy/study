open symmetric key petrovSymKey decryption by password = '!YourStrongPassword'
go

declare
@phone varbinary(max),
@region varbinary(max),
@address varbinary(max),
@nameFirm varbinary(max);

set @phone = EncryptByKey(Key_GUID('petrovSymKey'), convert(nvarchar, '+7 (900) 001 00 02'))
set @region = EncryptByKey(Key_GUID('petrovSymKey'), convert(nvarchar, 'Russia, Moscow'))
set @address = EncryptByKey(Key_GUID('petrovSymKey'), convert(nvarchar, 'Petrovka st., 38'))
set @nameFirm = EncryptByKey(Key_GUID('petrovSymKey'), convert(nvarchar, 'TV Centre'))

insert into client
    (key_client, fam, name, name_firm, credit, Crypt_address, Crypt_name_firm, Crypt_phone, Crypt_region)
values
    ('NEWC2', 'Ivanov', 'Denis', 'Wolski  Zajazd', 0, @address, @nameFirm, @phone, @region)