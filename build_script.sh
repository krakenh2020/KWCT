#!/bin/bash
echo "Executing build_script.sh"
echo "What is inside the folder:"
ls -alp

#Compiling docker file and coping the resulting jar in docker folder
mvn package -f src/docker_helloworld
cp src/docker_helloworld/target/HelloWorld-1.0.jar containers/docker_helloworld

#Compiling lambda, the jar will be pointend directly be the cloud formation
mvn package -f src/lambda_dynamo_read
