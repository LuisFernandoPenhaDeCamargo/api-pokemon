FROM node:18-alpine AS build
WORKDIR /opt/api/
COPY package.json package-lock.json ./
RUN npm install -g npm@8.19.2
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /opt/api/
COPY --from=build /opt/api/dist ./dist
COPY --from=build /opt/api/node_modules ./node_modules
COPY --from=build /opt/api/package.json .
COPY --from=build /opt/api/.env .
