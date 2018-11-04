FROM node:carbon

ENV NODE_ENV production

# Copy app source
COPY . /cab432server

# Set work directory to /src
WORKDIR /cab432server

# Install app dependencies
RUN npm install

# Expose port to outside world
EXPOSE 80

# Start Command as per package.json
CMD ["npm", "start"]