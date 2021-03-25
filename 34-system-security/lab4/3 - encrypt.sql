update Sale1.dbo.client
set asym_phone = SignByAsymKey(asymkey_id('assymetricKey'), phone, '!YourStrongPassword')

go

update Sale1.dbo.client
set asym_post_code = SignByCert(cert_id('personalCert'), post_code)