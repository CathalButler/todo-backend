FROM alpine:3.10

RUN apk update && apk add -U nodejs npm
RUN node --version
RUN npm --version

# Create the working directory
RUN mkdir -p /var/www/api

# Copy project files into the working directory
COPY . /var/www/api/

# Run npm install to download dependencies
RUN cd /var/www/api && npm install

# Set working diretory to created directory
WORKDIR /var/www/api

# Export the port the server will be running on
EXPOSE 4000

# Run commands to start application inside docker container
CMD ["node", "./bin/www"]
