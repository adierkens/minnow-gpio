'use strict';
var exec = require('child_process').exec;

const SUBADDR1 = 0x02;
const SUBADDR2 = 0x03;
const SUBADDR3 = 0x04;
const MODE1 = 0x00;
const PRESCALE = 0xFE;
const LED0_ON_L = 0x06;
const LED0_ON_H = 0x07;
const LED0_OFF_L = 0x08;
const LED0_OFF_H = 0x09;
const ALL_LED_ON_L = 0xFA;
const ALL_LED_ON_H = 0xFB;
const ALL_LED_OFF_L = 0xFC;
const ALL_LED_OFF_H = 0xFD;

class I2C {
  constructor(options) {
    this.address = 0x40;
    this.device = '/dev/i2c-0';
      
  }

  _send(cmd, values) {
    exec("i2cset -y 0 " + this.address + " " + cmd + " " + values);
    
  }

  _step2(err, res) {
    var oldmode = 0x11;
    var newmode = (oldmode & 0x7F) | 0x10;
    var prescale = this.prescale;

    this._send(MODE1, newmode);
    this._send(PRESCALE, Math.floor(prescale));
    this._send(MODE1, oldmode);
    sleep.usleep(10000);
    this._send(MODE1, oldmode | 0x80);
  
  }

  _read(cmd, length, callback) {
    
  }

  setPWMFrequency(frequency) {
    var  prescaleval = 25000000.0;
    prescaleval /= 4096.0;
    prescaleval /= frequency;
    prescaleval -= 1.0 ;

    this.prescale = Math.floor(prescaleval + 0.5);
    this._step2();
  }

  setPWM(channel, on, off) {
    this._send(LED0_ON_L + 4*channel, on & 0xFF);
    this._send(LED0_ON_H + 4*channel, on >> 8);
    this._send(LED0_OFF_L + 4*channel, off & 0xFF);
    this._send(LED0_OFF_H + 4*channel, off >> 8);
  }
};

module.exports = I2C;
