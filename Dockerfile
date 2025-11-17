FROM node:20-bullseye AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install all dependencies for building
COPY package*.json ./
RUN npm install

# Copy TypeScript config and source files
COPY tsconfig.json ./
COPY src ./src
COPY wdio.conf.ts ./

# Build TypeScript
RUN npm run build

# ===== Stage 2: Runtime (Ultra-light) =====
FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Copy only prod dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled output and minimal runtime files
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/wdio.conf.ts ./
COPY --from=builder /usr/src/app/src/config ./src/config
COPY --from=builder /usr/src/app/src/screens ./src/screens

# Expose Appium port
EXPOSE 4723

# Entry point: install Appium dynamically, then run tests
# This keeps the image size small until runtime
CMD ["sh", "-c", "\
  npm install -g appium appium-uiautomator2-driver allure-commandline && \
  appium & \
  npm test \
"]
