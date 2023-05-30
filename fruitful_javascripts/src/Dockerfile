# For resolver service
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the contents of the src directory to the /app directory in the container
COPY . .

CMD ["node", "resolvers.js"]
