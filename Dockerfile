FROM nginx:alpine

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN rm -rf /usr/share/nginx/html/*

COPY ./app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
