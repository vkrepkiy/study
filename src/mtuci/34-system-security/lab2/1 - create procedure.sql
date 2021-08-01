create proc ReadDecrypted
as
open symmetric key petrovSymKey decryption by password = '!YourStrongPassword'
select
    key_client, fam, name, patron,
    convert(nvarchar(24), DecryptByKey(Crypt_phone)) as phone,
    post_code, country, city,
    convert(nvarchar(15), DecryptByKey(Crypt_region)) as region,
    convert(nvarchar(60), DecryptByKey(Crypt_address)) as address,
    convert(nvarchar(50), DecryptByKey(Crypt_name_firm)) as name_firm,
    credit
from client

go

create proc ReadEncrypted
as
select
    key_client, fam, name, patron,
    convert(nvarchar(24), Crypt_phone) as phone,
    post_code, country, city,
    convert(nvarchar(15), Crypt_region) as region,
    convert(nvarchar(60), Crypt_address) as address,
    convert(nvarchar(50), Crypt_name_firm) as name_firm,
    credit
from client

go

grant execute ON dbo.ReadDecrypted to Petrov
grant execute ON dbo.ReadEncrypted to Petrov