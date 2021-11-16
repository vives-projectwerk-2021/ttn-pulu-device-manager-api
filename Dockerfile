FROM node:lts-alpine3.14

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD ["ts-node", "src/index.ts"]