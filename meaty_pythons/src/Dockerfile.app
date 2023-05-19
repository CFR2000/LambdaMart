# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY wait-for-redis.sh /app/wait-for-redis.sh
RUN chmod +x /app/wait-for-redis.sh


# Make port 8082 available to the world outside this container
EXPOSE 8082

# Run the shell script when the container launches
CMD ["/bin/bash", "/app/start.sh"]
