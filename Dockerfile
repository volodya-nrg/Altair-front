FROM node:12.16.1 as build
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./package.json
RUN npm install
RUN npm install -g @angular/cli@9.1.0
COPY . .
RUN ng build --prod=true --optimization=true --sourceMap=false

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./result.crt /etc/nginx/result.crt
COPY ./private.key /etc/nginx/private.key
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

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
