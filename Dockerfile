ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine
RUN npm install -g npm@latest

WORKDIR /opt/site
COPY  package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
#ARG BUILD_TYPE=staging
#RUN npm run generate:${BUILD_TYPE}
RUN npm run build
