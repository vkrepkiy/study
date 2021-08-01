# Inherit vanilla dockerfile
FROM postgres

# Copy compressed  initial script
COPY demo-big.zip /docker-entrypoint-initdb.d/

# Install 'unzip'
RUN apt-get update
RUN apt-get install unzip

WORKDIR /docker-entrypoint-initdb.d

# Extract initial script
RUN unzip demo-big.zip -d .
RUN rm demo-big.zip

# Run db
CMD ["postgres"]
