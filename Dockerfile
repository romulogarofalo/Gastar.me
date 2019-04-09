FROM node:10.9.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g nodemon --quiet
EXPOSE 4000
CMD ["npm", "run", "dev"]