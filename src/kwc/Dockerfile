# Stage: build angular app
FROM node:16.10.0-buster as build

RUN apt-get install \
	curl \
    ;

RUN mkdir -p "/kwc" \
&& chmod -R 775 "/kwc" \
;

WORKDIR /kwc
COPY . .

RUN npm install 
RUN npm install -g @angular/cli@13.0.0
RUN npm install -g ts-node
RUN npm install -g http-server

RUN chmod 775 ./src/run-kwc.sh
CMD ["/bin/sh"]