create master key encryption by password = '!YourStrongPassword'

go

create certificate personalCert
from file = 'personal_cert.cer'
with private key (file = 'personal_cert.pvk',
decryption by password = '!YourStrongPassword')