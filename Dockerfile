# Use the official Node.js LTS image as the base image
FROM node:lts-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 8082

# Command to run your application
CMD ["npm", "start"]
