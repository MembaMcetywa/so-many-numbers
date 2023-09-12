# So Many Numbers, I Lost Count at 122

This is a phone number generator application that generates random numbers using Randommer and validates them against google's libphonenumber library to pull valid phone numbers.

The project is built using the following:

--Vite
--TypeScript
--NestJs
--MongoDB
--Docker

# Docker

To get the MongoDB container up and running, execute the following commands:

1. `cd so-many-numbers`
2. `docker-compose up -d`

You can check if the container is up by running the following command:

`docker ps`

This should show you an entry of the mongodb container in the list of running containers. This check confirms to us whether or not the container is running successfully.

Should you wish to you stop the container from running, execute the following command:

`docker compose down`
