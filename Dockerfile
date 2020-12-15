FROM node:12.18.3

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3333
CMD npm run start