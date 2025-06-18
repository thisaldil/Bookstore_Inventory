# Use official lightweight OpenJDK image
FROM openjdk:17-jdk-slim

# Create directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . .

# Package the application (skip tests)
RUN ./mvnw clean package -DskipTests

# Run the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]
