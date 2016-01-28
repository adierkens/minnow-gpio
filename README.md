# minnow-gpio
> A GPIO helper library for the minnowboard max

[![Build Status](https://travis-ci.org/adierkens/minnow-gpio.svg?branch=master)](https://travis-ci.org/adierkens/minnow-gpio)

# Overview

```javascript

  var minnow = require('minnow-gpio');
  
  // Setup the GPIO pins before using them
  // Only needs to be called once
  minnow.setup(minnow.pin.GPIO_1, minnow.direction.OUT);

  // Make the pin output HIGH
  minnow.set(minnow.pin.GPIO_1, minnow.value.HIGH);
  // or 
  minnow.set(minnow.pin.GPIO_1, 1);
  // or 
  minnow.set(minnow.pin.GPIO_1, true);



```


