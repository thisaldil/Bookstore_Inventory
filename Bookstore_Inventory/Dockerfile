# Use Maven to build the app
FROM maven:3.9.5-eclipse-temurin-17 as builder

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Final lightweight image to run
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Expose port used by Spring Boot
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
