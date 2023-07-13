
## Package larni yuklash

```bash

$ npm i -g @nestjs/cli

$ npm install

```

## Dockerni yuklab olish
<a href="https://www.docker.com/products/docker-desktop/">https://www.docker.com/products/docker-desktop/</a>

## Docker compose file

### postgress ni ishga tushurish
docker-compose.yml
```yml
version: '3'
services:
  db:
    image: postgres
    ports:
      - 5436:5432
    environment:
      POSTGRES_DB: olxclone
      POSTGRES_USER: postgress
      POSTGRES_PASSWORD: 123
    
```
terminal 
```bash
docker compose up
```

## Projectni ishga tushirish

```bash
$ npm run start:dev
```

## Project Docs

1. <a href="https://documenter.getpostman.com/view/20661688/2s946e8sgE">Link Docs Postman</a>
2. <a href="https://localhost:3000/api">Link Docs Swagger localhost:3000/api</a>
