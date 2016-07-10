# BlurMonitor
## Web Based Remote Performance Monitoring

BlurMonitor is a web based performance monitoring tool for Linux systems based on the [BlurAdmin Template](https://github.com/akveo/blur-admin)

It may work on other POSIX systems, but this is untested.

Currently the tool can be used to monitor the following information:

* Processor model
* Processor clock speed on variable clock speed models
* Processor Utilization
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
* dig command (Not always installed by default.)
* free command
* traceroute command (Not always installed by default.)

## Installation

1. Ensure all necessary commands are installed through your distro's package manager:
```bash
sudo apt-get install -y dig free traceroute
```

2. Install the latest version of Node.js for your operating system.

3. Ensure that NPM is up to date:
```bash
sudo npm install -g npm
```

4. Install bower and gulp:
```bash
sudo npm install -g bower gulp
```

5. Install NPM dependencies:
```bash
npm install
```

6. Install Bower dependencies:
```bash
bower install
```

7. Perform a build:
```bash
gulp build
```

8. Serve the fully assembled project:
```bash
node api/server.js serve:dist
```

The server will launch on port 3000. A proxy server through Apache or NGINX is recommended for production environments.

Sample Apache configuration:

### /etc/apache2/sites-enabled/001-blur.conf
```
&lt;VirtualHost *:80&gt;
	ServerName blur.mydomain.com
	
	# Disable compression for the bandwidth test. All other requests are already compress.
	SetEnv no-gzip 1
	
	ProxyRequests On
	ProxyPass / http://127.0.0.1:3000/
&lt;/VirtualHost&gt;
```

## Issues

Please report issues and enhancements. This is a project seeking to change and grow!

## License

<a href=/LICENSE.txt target="_blank">MIT</a> license.
