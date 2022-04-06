FROM node:latest
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
COPY . .
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

CMD [ "npm", "start" ]
# CMD 