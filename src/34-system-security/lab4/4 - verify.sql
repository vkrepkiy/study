select key_client,
    post_code,
    VerifySignedByCert(cert_id('personalCert'), post_code, asym_post_code) as IsPostCodeValid,
    phone,
    VerifySignedByAsymKey(asymkey_id('assymetricKey'), phone, asym_phone) as IsPhoneValid
from dbo.client