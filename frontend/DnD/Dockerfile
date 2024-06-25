FROM node:22-alpine3.19 AS install
WORKDIR /app
COPY package*.json ./
RUN yarn install

FROM install as copy
COPY . .

FROM copy as start
CMD ["yarn", "start"]