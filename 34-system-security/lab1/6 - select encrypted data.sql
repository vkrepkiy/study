open symmetric key petrovSymKey decryption by password = '!YourStrongPassword'
go
select
    Crypt_phone as ePhone,
    convert (nvarchar, DecryptByKey(Crypt_phone)) as Phone,
    Crypt_region as eRegion,
    convert (nvarchar, DecryptByKey(Crypt_region)) as Region,
    Crypt_address as eAddress,
    convert (nvarchar, DecryptByKey(Crypt_address)) as Address,
    Crypt_name_firm as eNameFim,
    convert (nvarchar, DecryptByKey(Crypt_name_firm)) as [Company Name]
from client