FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package.json /.
COPY yarn.lock /.

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

FROM nginx:alpine

COPY  --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

