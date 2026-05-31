FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_POSTHOG_KEY
ARG REACT_APP_POSTHOG_HOST
ENV REACT_APP_POSTHOG_KEY=$REACT_APP_POSTHOG_KEY \
    REACT_APP_POSTHOG_HOST=$REACT_APP_POSTHOG_HOST
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80