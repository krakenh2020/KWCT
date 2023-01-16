FROM public.ecr.aws/amazonlinux/amazonlinux:latest
RUN yum -y install java-1.8.0
EXPOSE 8080
ADD HelloWorld-1.0.jar HelloWorld-1.0.jar
ENTRYPOINT ["java","-jar","HelloWorld-1.0.jar"]
