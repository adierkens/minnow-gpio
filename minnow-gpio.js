'use strict';
const exec = require('child_process').exec;
const _ = require('lodash');

const pins = {
  GPIO_0: 336,
  GPIO_1: 338,
  GPIO_2: 340,
  GPIO_3: 329,
  GPIO_4: 331,
  GPIO_5: 333,
  GPIO_6: 335,
  GPIO_7: 337,
  GPIO_8: 339,
  GPIO_9: 341
};

const direction = {
  OUT: 'out',
  IN: 'in'
};

const value = {
  HIGH: true,
  LOW: false
};

process.on('SIGTERM', function() {
  _.each(exportedPins, function(pin) {
    exec("echo " + pin + " > /sys/class/gpio/unexport");
  }); 
});

var cons = function(error, stdout, stderr) {
  console.log(error);
  console.log(stdout);
  console.log(stderr);
};

var exportedPins = [];

module.exports = {
  pin: pins,
  direction: direction,
  setup: function(pin, direction) {
    if (typeof pin === "number") {
      if (exportedPins.indexOf(pin) === -1) {
        exec("echo " + pin + " > /sys/class/gpio/export", cons);
        exec("echo " + direction + " > /sys/class/gpio/gpio" + pin + "/direction", cons);
        exportedPins.push(pin);
      }
    }
  },
  set: function(pin, value, callback) {
    if (typeof pin === "number") {
      var val = 0;
      if (value) {
        val = 1;
      }
      exec("echo " + val + " > /sys/class/gpio/gpio" + pin + "/value");
    } else {
      console.log('Pin must be a number');
    }
  },
  get: function(pin, callback) {
  
  }
};
