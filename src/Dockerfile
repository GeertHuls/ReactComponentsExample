FROM node:12

RUN mkdir -p /home/app
WORKDIR /home/app

# Installing dependencies
COPY package*.json /home/app/
RUN npm install

# Copying source files
COPY . /home/app

# Building app
RUN npm run build
EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]
