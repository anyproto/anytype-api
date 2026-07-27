FROM oven/bun:alpine

WORKDIR /opt/site
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
#ARG BUILD_TYPE=staging
#RUN bun run generate:${BUILD_TYPE}
RUN bun run build
