FROM maven:3.9-eclipse-temurin-17-noble AS build
WORKDIR /work
COPY pom.xml .
COPY core/pom.xml core/pom.xml
COPY server/pom.xml server/pom.xml
COPY CHANGELOG.md .
COPY docs/EXECUTIVE_CONTINUITY_AND_SENTIMENT_REGISTER.md ./docs/
COPY src ./src
COPY resources ./resources
RUN mvn -q -DskipTests install && mvn -q -f server/pom.xml dependency:copy-dependencies -DoutputDirectory=target/dependency
FROM eclipse-temurin:17-jre-noble
WORKDIR /app
COPY --from=build /work/server/target/SlopFizzBuzzEnterpriseEdition-1.0-SNAPSHOT.jar ./app.jar
COPY --from=build /work/server/target/dependency/ ./lib/
RUN mkdir -p /data && chown 10001:10001 /data
ENV PORT=8080
EXPOSE 8080
USER 10001:10001
ENTRYPOINT ["java", "-cp", "/app/app.jar:/app/lib/*", "com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.HttpMain"]
