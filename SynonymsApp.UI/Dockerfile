FROM node:20-alpine

WORKDIR /app

RUN npm i -g serve

COPY . .

RUN npm ci --include=dev

RUN npm run build -- --mode development

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]