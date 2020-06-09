FROM node:13.14.0-alpine3.10

WORKDIR /app

COPY package.json .
# to install without save-dev packages
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]