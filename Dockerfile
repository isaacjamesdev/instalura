FROM node:12

MAINTAINER Isaac James <isaacjames@alu.ufc.br>

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 3000

CMD ["npm", "start"]
