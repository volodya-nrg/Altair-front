FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npm run build:ssr

FROM gcr.io/distroless/nodejs
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
CMD ["dist/app/server/main.js"]