# base image
FROM node

# set working directory
WORKDIR /gui

# add `/app/node_modules/.bin` to $PATH
ENV PATH /gui/node_modules/.bin

# install and cache app dependencies
#COPY package.json /gui/package.json
CMD curl -sL https://deb.nodesource.com/setup_10.x | bash -
CMD npm install --silent
CMD npm install react-scripts@3.0.1 -g --silent

# start app
CMD npm start