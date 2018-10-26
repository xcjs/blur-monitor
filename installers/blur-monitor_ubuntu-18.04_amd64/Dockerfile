FROM ubuntu:18.04 AS blur-monitor-build-ubuntu-18.04
LABEL maintainer="zlowery@xcjs.com"

RUN mkdir -p /tmp/blur-monitor
WORKDIR /tmp/blur-monitor

COPY ./ .

RUN apt-get update
RUN apt-get -qq full-upgrade
RUN apt-get -qq autoremove

RUN apt-get -qq install apt-utils build-essential curl gdebi-core git libpam0g-dev python

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm

RUN npm install
RUN npm run build:tarball
RUN npm run installer:ubuntu-18.04_amd64

RUN gdebi --non-interactive installers/blur-monitor_ubuntu-16.04_amd64.deb

RUN sleep 10

RUN netstat -tulpn | grep 3201
