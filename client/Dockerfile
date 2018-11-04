FROM node:carbon

ENV NODE_ENV production

# Copy app source
COPY . /cab432client

# Set work directory to /src
WORKDIR /cab432client

# Install app dependencies
RUN npm install

# Expose port to outside world
EXPOSE 3000

# Start Command as per package.json
CMD ["npm", "start"]