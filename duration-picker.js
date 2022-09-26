/**
 * Implements a time duration picker.
 */
class DurationPicker {
    /**
     * Constructs a duration picker.
     * @param {string} id HTML id of the element to attach to
     * @param {Object} description Description of how to initialize the picker.
     */
    constructor(id, description) {
        this.el = document.getElementById(id);
        this.el.classList.add('duration-picker');
        this._inputs = [];
        this._InitDurationPicker(this.el, description);
    }

    /**
     * Returns the duration of this timepicker in seconds.
     */
    GetDuration() {
        let total = 0;
        for (const input of this._inputs) {
            total += this._GetInputDuration(input);
        }
        return total;
    }

    /**
     * Returns the computed timestamp of an individual duration input based on the description of its metadata
     * @param {Object} input Input from this._inputs
     */
    _GetInputDuration(input) {
        let value = parseFloat(input.input.value);
        // Handle bad input.
        if (isNaN(value)) {
            return 0;
        }

        // Meta says how many seconds a single unit is.
        return value * input.meta.seconds;
    }

    /**
     * Initializes the duration picker
     * @param {HTMLElement} element HTML element to update
     * @param {Object} description Description containing labels and metadata to use
     */
    _InitDurationPicker(element, description) {
        let labels = Object.keys(description);
        for (const label of labels) {
            this._AddSingleDurationPicker(element, label, description[label]);
        }
    }

    /**
     * Adds an individual input with the given label to the HTML Element
     * @param {HTMLElement} element Element to add data to
     * @param {string} label String of the label to use for this input
     * @param {Object} description Description of input parameters
     */
    _AddSingleDurationPicker(element, label, description) {
        // Add an input field to the HTML element
        let input = this._AddInputField(element);
        // Add the label to the html element
        this._AddLabel(element, label);
        // Apply constraints to the input field
        this._ApplyConstraints(input, description);
        // Add the input field and its metadata to this object
        this._inputs.push({
            input: input,
            meta: description
        });
    }

    /**
     * Adds a basic input field to the given element
     * @param {HTMLElement} element HTML element to add input field to
     * @returns {HTMLElement} input element
     */
    _AddInputField(element) {
        // Create the input element
        let input = document.createElement('input');
        input.type = "number";
        // Add the input to the given element
        element.appendChild(input);
        // Return a handle to the input
        return input;
    }

    /**
     * Adds a label with the given string to the element
     * @param {HTMLElement} element HTML element to add input field to
     * @param {string} label Content of the label
     */
    _AddLabel(element, label) {
        let label_html = document.createElement('label');
        label_html.textContent = label;
        element.appendChild(label_html);
    }

    /**
     * Applies constraints to the given input element described by constraints.
     * @param {HTMLElement} input HTML Input to apply constraints to
     * @param {Object} constraints Constraints to apply to the input element
     */
    _ApplyConstraints(input, constraints) {
        input.addEventListener('input', (e) => {
            let val = parseFloat(input.value);
            // Clamp to min/max if they're provided by constraints
            if (constraints.hasOwnProperty('min') && (val < constraints.min)) {
                input.value = constraints.min;
            } else if (constraints.hasOwnProperty('max') && (val > constraints.max)) {
                input.value = constraints.max;
            }
        });
    }
}
