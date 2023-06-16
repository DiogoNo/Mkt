FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server"]
EXPOSE 3000