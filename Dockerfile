FROM node:alpine
WORKDIR /app
# EXPOSE 3000
COPY package*.json ./
RUN npm ci
COPY . .

# RUN npm uninstall bcrypt
# RUN npm install bcrypt

CMD [ "npm", "start" ]
# CMD 