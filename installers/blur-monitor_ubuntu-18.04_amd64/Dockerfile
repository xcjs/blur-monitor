FROM ubuntu:18.04 AS blur-monitor-build-ubuntu-18.04
LABEL maintainer="zlowery@xcjs.com"

RUN mkdir -p /tmp/blur-monitor
WORKDIR /tmp/blur-monitor

COPY ./ .

RUN apt-get update
RUN apt-get -qq full-upgrade
RUN apt-get -qq autoremove

RUN apt-get -qq install build-essential curl gdebi-core git libpam0g-dev python

RUN curl -qO- https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
