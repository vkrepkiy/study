use Sale1
go
create login Petrov with password = '!YourStrongPassword'
go
create user Petrov for login Petrov
go
create schema ps authorization Petrov
go
grant select, update, delete, insert to Petrov