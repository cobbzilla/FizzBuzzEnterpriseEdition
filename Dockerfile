FROM maven:3.9-eclipse-temurin-17-noble AS build
WORKDIR /work
COPY pom.xml .
COPY src ./src
COPY resources ./resources
RUN mvn -q -DskipTests package dependency:copy-dependencies -DoutputDirectory=target/dependency

FROM eclipse-temurin:17-jre-noble
WORKDIR /app
COPY --from=build /work/target/SlopFizzBuzzEnterpriseEdition-1.0-SNAPSHOT.jar ./app.jar
COPY --from=build /work/target/dependency/ ./lib/
ENV PORT=8080
EXPOSE 8080
USER 10001:10001
ENTRYPOINT ["java", "-cp", "/app/app.jar:/app/lib/*", "com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.HttpMain"]
