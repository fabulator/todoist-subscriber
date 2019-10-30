FROM node:12-alpine AS build

WORKDIR /srv

COPY . /srv/
RUN npm ci
RUN npm run build
RUN npm ci --production

FROM node:12-alpine
WORKDIR /srv
USER node
COPY --from=build /srv/node_modules /srv/node_modules
COPY --from=build /srv/dist /srv/
HEALTHCHECK CMD wget localhost:8080/-/healthy -q -O - > /dev/null 2>&1
EXPOSE 8080

CMD node index.js
