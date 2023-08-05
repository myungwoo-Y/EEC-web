FROM node:18-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
        
RUN npm ci

COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]