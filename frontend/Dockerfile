# Build stage
FROM node:18-alpine as build

# Set working directory to match your project structure
WORKDIR /catalyzator/frontend

# Copy package files from the src directory's parent (frontend directory)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the src directory and other necessary files
COPY src/ ./src/
COPY public/ ./public/
COPY *.json ./

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config if you have one
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /catalyzator/frontend/build /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://localhost:80/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]