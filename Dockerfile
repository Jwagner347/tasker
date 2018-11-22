FROM mysql:8

ENV TZ America/Chicago
ADD dbschema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306