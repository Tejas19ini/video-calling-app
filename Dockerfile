# Use Java 17
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Give permission to mvnw
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean install -DskipTests

# Run the application
CMD ["java", "-jar", "target/videocall-0.0.1-SNAPSHOT.jar"]
