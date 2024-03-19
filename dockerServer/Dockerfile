FROM node

WORKDIR /appDoc

COPY package.json /appDoc

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]