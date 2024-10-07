FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci --include=dev

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]