## Description

## Project setup
- Install dependences
```bash
npm install
```
- Run DB in Docker
```bash
npm docker:up
```
- Migrate prisma
```bash
npm run prisma:migrate
```
- Launch prisma studio(optional)
```bash
npx prisma studio
```

## Compile and run the project


- development
```bash
$ npm run start
```
- watch mode
```bash
$ npm run start:dev
```
- production mode
```bash
$ npm run start:prod
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
