(function() {
   'use strict';

   angular.module('BlurMonitor.processes').controller('LoadedProcessesController', LoadedProcessesController);

   function LoadedProcessesController() {
       var vm = this;

       vm.processes = vm.processes || [];
       vm.icons = vm.icons || [];
       
       vm.$onChanges = function(changes) {
           if (changes && changes.processes) {
               vm.processes = getLoadedProcesses(changes.processes.currentValue || []);
           }
       };

       function getLoadedProcesses(processes) {
           processes = processes.filter(function(process) {
               if(parseFloat(process.memoryUtilization) > 0) {
                   return process;
               }
           });

           processes.sort(function(a, b) {
               return b.memoryUtilization - a.memoryUtilization;
           });

           angular.forEach(processes, function(process) {
               var iconName = getIconName(process.command);

               process.displayName = process.command;
               process.icon = '/assets/img/app/apps/' + iconName + '.svg';
               process.iconFont = iconName === 'process';
           });

           return processes;
       }

       function getIconName(command) {
           if (command.indexOf(' ') > -1) {
               command = command.substr(0, command.indexOf(' '));
           }

           if (command.indexOf('/') > -1 && command.indexOf('[') === -1) {
               command = command.substr(command.lastIndexOf('/') + 1, command.length - command.lastIndexOf('/'));
           }

           if (!vm.icons.includes(command)) {
               command = 'process';
           }

           return command;
       }
   }
})();
