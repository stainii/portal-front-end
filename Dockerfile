FROM node AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
