FROM node:22

WORKDIR /app

RUN npm i -g serve

COPY . .

RUN npm install

RUN npm run build -- --mode production

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]