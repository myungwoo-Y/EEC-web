FROM node:18-alpine3.15

WORKDIR /app/server

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        make \
        python2 \
        python3 \
        pkgconfig \
        g++ \
        build-base \
        cairo-dev \
        jpeg-dev \
        pango-dev \
        giflib-dev
        
RUN npm ci

COPY . .

RUN npm run build
RUN npm install sharp
RUN npm install pm2 -g

EXPOSE 8080
CMD [ "pm2", "start", "dist/src/main.js", "--name" "eec-server" ]