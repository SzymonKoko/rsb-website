FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_SITE_URL=https://rozwinswojbiznes.pl
ARG VITE_API_URL=
ARG VITE_WEB3FORMS_ACCESS_KEY=
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WEB3FORMS_ACCESS_KEY=$VITE_WEB3FORMS_ACCESS_KEY

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
