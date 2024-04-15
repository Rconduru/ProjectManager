FROM node:16-alpine as frontbuilder
WORKDIR /usr/src/app
COPY package*.json yarn.lock tsconfig.json ./
RUN yarn
COPY src/ ./src/
COPY public/ ./public/
COPY .env ./
EXPOSE 3000
CMD ["yarn", "start"]


