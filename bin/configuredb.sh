#!/bin/bash

database="api-csv-db"

echo "Configuring database: $database"

dropdb -U api_csv api-csv-db
createdb -U api_csv api-csv-db

psql -U api_csv api-csv-db < ./bin/sql/api-csv.sql

echo "$database configured"