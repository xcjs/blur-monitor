# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.define "xenial64" do |xenial64|
    xenial64.vm.box = "ubuntu/xenial64"
    xenial64.vm.hostname = "xenial64"
    xenial64.vm.network "forwarded_port", guest: 3201, host: 3202
    xenial64.vm.synced_folder "./", "/vagrant", type: "virtualbox"
    xenial64.vm.provider "virtualbox"

    xenial64.vm.provision "shell", privileged: false, inline: <<-SHELL
      sudo apt-get -qq update
      sudo apt-get -qq full-upgrade
      sudo apt-get -qq autoremove

      sudo apt-get -qq install git curl python build-essential libpam0g-dev gdebi-core

      curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
      sudo apt-get -qq install nodejs

      sudo npm install -g npm

      cd /vagrant

      npm install
      npm rebuild
      npm run installer:ubuntu-16.04_amd64

      sudo gdebi --non-interactive installers/blur-monitor_ubuntu-16.04_amd64.deb

      sleep 10

      sudo netstat -tulpn | grep 3201
    SHELL
  end

  config.vm.define "bionic64" do |bionic64|
    bionic64.vm.box = "ubuntu/bionic64"
    bionic64.vm.hostname = "bionic64"
    bionic64.vm.network "forwarded_port", guest: 3201, host: 3202
    bionic64.vm.synced_folder "./", "/vagrant", type: "virtualbox"
    bionic64.vm.provider "virtualbox"

    bionic64.vm.provision "shell", privileged: false, inline: <<-SHELL
      sudo apt-get -qq update
      sudo apt-get -qq full-upgrade
      sudo apt-get -qq autoremove

      sudo apt-get -qq install git curl python build-essential libpam0g-dev gdebi-core

      curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
      sudo apt-get -qq install nodejs

      sudo npm install -g npm

      cd /vagrant

      npm install
      npm rebuild
      npm run build:tarball
      npm run installer:ubuntu-18.04_amd64

      sudo gdebi --non-interactive installers/blur-monitor_ubuntu-18.04_amd64.deb

      sleep 10

      sudo netstat -tulpn | grep 3201
    SHELL
  end

  config.vm.define "stretch64" do |stretch64|
    stretch64.vm.box = "debian/stretch64"
    stretch64.vm.hostname = "stretch64"
    stretch64.vm.network "forwarded_port", guest: 3201, host: 3202
    stretch64.vm.synced_folder "./", "/vagrant", type: "virtualbox"
    stretch64.vm.provider "virtualbox"

    stretch64.vm.provision "shell", privileged: false, inline: <<-SHELL
      sudo apt-get -qq update
      sudo apt-get -qq full-upgrade
      sudo apt-get -qq autoremove

      sudo apt-get -qq install git curl python build-essential libpam0g-dev gdebi-core net-tools

      curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
      sudo apt-get -qq install nodejs

      sudo npm install -g npm

      cd /vagrant

      npm install
      npm rebuild
      npm run installer:debian-9_amd64

      sudo gdebi --non-interactive installers/blur-monitor_debian-9_amd64.deb

      sleep 10

      sudo netstat -tulpn | grep 3201
    SHELL
  end

end
