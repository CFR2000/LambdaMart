# Uses the node base image with the latest LTS version
FROM node:20.2
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 4000

COPY .  app/
# Changes working directory to the new directory just created
WORKDIR /app

# Installs npm dependencies on container
RUN npm install
# Compiles TypeScript to JavaScript
RUN npm run compile
# Command container will actually run when called
CMD ["npm", "run", "start"]