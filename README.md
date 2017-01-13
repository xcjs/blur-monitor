# BlurMonitor
## Web Based Remote Performance Monitoring

BlurMonitor is a web based performance monitoring tool for Linux systems based on the [BlurAdmin Template](https://github.com/akveo/blur-admin)

It may work on other POSIX systems, but this is untested.

Currently the tool can be used to monitor the following information:

* Processor model
* Processor clock speed on variable clock speed models
* Processor utilization
* Memory utilization
* Swap utilization
* Mount points and disk utilization
* External IP address
* Network interfaces and bindings
* Client-resolvable bandwidth
* Reverse traceroute to client
* The top processor hungry tasks
* The top memory hungry tasks
* All running tasks and their relationships

## Features from BlurAdmin

* Responsive layout
* High resolution
* Bootstrap CSS Framework
* Sass
* Gulp build
* AngularJS
* Jquery
* Charts (Chart.js)
* etc

## Requirements

* Node.js with NPM
* Gulp
* Bower
* cat
* dig command through the dnsutils package
* free
* ps
* traceroute
* ifstat

## Installation

1. Ensure all necessary commands are installed through your distro's package manager:
	```
	sudo apt-get install -y dnsutils traceroute ifstat
	```
2. Install the latest version of Node.js for your operating system.
3. Ensure that NPM is up to date:
	```
	sudo npm install -g npm
	```
4. Install bower and gulp:
	```
	sudo npm install -g bower gulp
	```
5. Install NPM dependencies:
	```
	npm install
	```
6. Install Bower dependencies:
	```
	bower install
	```
7. Perform a build:
	```
	gulp build
	```
8. Serve the fully assembled project:
	```
	node ./blurmonitor
	```

The server will launch on port 3000 by default, or you can reference the command line flags.

A proxy server through Apache or NGINX is recommended for production environments.

Sample Apache configuration:

### /etc/apache2/sites-enabled/001-blur.conf
```
<VirtualHost *:80>
	ServerName blur.mydomain.com

	# Disable compression for the bandwidth test. All other requests are already compressed.
	SetEnv no-gzip 1

	ProxyRequests On
	ProxyPass / http://127.0.0.1:3000/
</VirtualHost>
```

## Command Line Flags

### Port (-p)
```bash
	node ./blurmonitor -p 3000
```

### Environment (-e)

The environment can be either prod (default) or dev.

```bash
	node ./blurmonitor -e dev
```

```bash
	node ./blurmonitor -e prod
```

## Issues

Please report issues and enhancements. This is a project seeking to change and grow!

## License

<a href=/LICENSE.txt target="_blank">MIT</a> license.

## Art Licenses

Included icons are courtesy of the former Flattr icon project: https://github.com/NitruxSA/luv-icon-theme

Additional icons courtesy of KDA Web Technologies: http://icons.kdaweb.com/

Original project icons used when no other subtitutue could be found. If there
are any copyright concerns, please issue a pull request and the offending
artwork will be removed.
