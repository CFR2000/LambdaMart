FROM node:18-alpine AS build

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# CMD ["npm", "run", "serve"]

FROM nginx:1.21.3-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/public .
ENTRYPOINT ["nginx", "-g", "daemon off;"]