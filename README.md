# The Extensible Duration Picker/Unit Converter
This is a simple vanilla javascript implementation of an extensible time duration picker.
It is extremely extensible.
It was initially written as a duration picker, and can function as a unit converter as well.

See the demo here (TODO add link when it's hosted)

## Simplest Usage
Download and include duration-picker.js and include it on your page.

Bring your own CSS (for now). The div containing your inputs and labels will have the css class `duration-picker` on it.

This code will create a duration picker that allows the user to enter hours, minutes, and seconds.
```javascript
let picker = new DurationPicker('id-of-html-element', {
    hours: {
        seconds: 3600
    },
    minutes: {
        seconds: 60
    },
    seconds: {
        seconds: 1
    }
});
```

If you'd like to turn this into an npm package, I would really appreciate that!


