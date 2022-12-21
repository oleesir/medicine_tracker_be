# Use the official nodejs image as parent
FROM node:18.10.0-slim
# Set the working directory.
WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 5000

CMD yarn start