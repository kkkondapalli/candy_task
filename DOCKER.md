## DOCKER SPIN UP


> Make sure your system is setup with Docker

> Start the Docker

Then you can run the following command spin up the local environment.



```shell
docker-compose up
```
> This will run the app at given port `3000` (default can be changed from .env file)

> and creates 2 databases `testing` and $DB_DATABASE with given user and password settings


> To stop the container

```shell
docker-compose down
```

> Note: If you have updated the DB configs they won't be created again.
> You need to rebuild the container

```shell
docker-compose build --no-cache
```