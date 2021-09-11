# Inherit vanilla dockerfile
FROM postgres
# Copy our init scripts
COPY *-init.sql /docker-entrypoint-initdb.d/
# Run db
CMD ["postgres"]
