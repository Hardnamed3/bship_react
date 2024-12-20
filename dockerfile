# Step 1: Build the React app using Vite
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app code
COPY . ./

# Build the app using Vite
RUN npm run build

# Step 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build output to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html


# Expose the port React will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]