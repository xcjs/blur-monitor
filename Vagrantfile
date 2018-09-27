# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.define "bionic" do |bionic|
    bionic.vm.box = "ubuntu/bionic64"
    bionic.vm.hostname = "bionic"
    bionic.vm.network "forwarded_port", guest: 3000, host: 3201
    bionic.vm.synced_folder "./", "/vagrant"

    bionic.vm.provision "shell", privileged: false, inline: <<-SHELL
      sudo apt-get -qq update
      sudo apt-get -qq full-upgrade
      sudo apt-get -qq autoremove

      sudo apt-get -qq install curl python build-essential libpam0g-dev

      curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
      sudo apt-get -qq install nodejs

      sudo npm install -g npm

      cd /vagrant

      npm install
      npm run installer:ubuntu-18.04_amd64

      sudo apt-get -f install installers/blur-monitor_ubuntu-18.04_amd64.deb
    SHELL
  end

end
