# Build stage
FROM node:20.16-alpine3.19 AS build

WORKDIR /build

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20.16-alpine3.19 AS production

WORKDIR /build

COPY package*.json .

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

EXPOSE 8000

COPY --from=build /build/dist ./dist

CMD ["node", "dist/server.js"]