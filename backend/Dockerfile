# Stage 1: Build application with Maven and JDK 17
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy Maven pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package application into executable JAR
RUN mvn clean package -DskipTests

# Stage 2: Runtime image with lightweight JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/taskpulse-0.0.1-SNAPSHOT.jar app.jar

# Render injects PORT dynamically
EXPOSE 8080

# Execute Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
