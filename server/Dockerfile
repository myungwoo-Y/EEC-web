FROM node:18-alpine3.15

WORKDIR /app
VOLUME ["/app"]
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
EXPOSE 8080
CMD [ "node", "dist/main.js" ]