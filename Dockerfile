# Use Node.js 20 as base image
FROM node:20-bullseye

# Install required tools for Android
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    wget \
    unzip \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Appium and Allure globally
RUN npm install -g appium appium-uiautomator2-driver allure-commandline

# Set working directory inside container to match project root
WORKDIR /usr/src/todo-app-automation

# Copy only package files first for dependency caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy TypeScript config separately for incremental build
COPY tsconfig.json ./

# Copy the rest of the source code
COPY src ./src
COPY wdio.conf.ts ./

# Build TypeScript
RUN npm run build

# Copy remaining files (docs, README, etc.)
COPY . .

# Expose Appium default port
EXPOSE 4723

# Default command: start Appium server and run tests
CMD ["sh", "-c", "appium & npm test"]
