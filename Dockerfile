# Node Base Image:
FROM node

# App Directory:
WORKDIR /home/app

# Copying application to the container:
COPY src .

# Entering into the application soruce files:
WORKDIR /home/app/src

# Installing all of the relevant NPM dependencies:
RUN npm install --only=production

# Exposing the active port of the container: 
EXPOSE 7070

# Launching Node App:
CMD ["npm", "start"]
