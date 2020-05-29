FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod=true --optimization=true --sourceMap=false

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./result.crt /etc/nginx/result.crt
COPY ./private.key /etc/nginx/private.key
ENTRYPOINT ["nginx", "-g", "daemon off;"]

#FROM nginx:alpine
#
## Заменяем дефолтную страницу nginx соответствующей веб-приложению
#RUN rm -rf /usr/share/nginx/html/*
#
#COPY ./app /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/nginx.conf
#COPY ./result.crt /etc/nginx/result.crt
#COPY ./private.key /etc/nginx/private.key
#
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
