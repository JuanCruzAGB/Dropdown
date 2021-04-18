// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} defaultProps Default properties. */
let defaultProps = {
    id: 'dropdown-1',
};

/** @var {object} defaultState Default state. */
let defaultState = {
    open: false,
    active: false,
};

/**
 * * Dropdown makes an excellent dropdown.
 * @export
 * @class Dropdown
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Dropdown extends Class {
    /**
     * * Creates an instance of Dropdown.
     * @param {object} [props] Dropdown properties:
     * @param {string} [props.id='dropdown-1'] Dropdown primary key.
     * @param {object} [state] Dropdown state:
     * @param {boolean} [state.open=false] Dropdown open state.
     * @param {string} [state.active=false] Dropdown active state.
     * @param {object} [callbacks] Dropdown callbacks:
     * @param {object} [callbacks.open] Dropdown open callback:
     * @param {object} [callbacks.open.function] Dropdown open callback function.
     * @param {object} [callbacks.open.params] Dropdown open callback params.
     * @param {object} [callbacks.close] Dropdown close callback:
     * @param {object} [callbacks.close.function] Dropdown close callback function.
     * @param {object} [callbacks.close.params] Dropdown close callback params.
     * @memberof Dropdown
     */
    constructor (props = {
        id: 'dropdown-1',
    }, state = {
        open: false,
        active: false,
    }, callbacks = {
        open: {
            function: () => { /* console.log('OPEN'); */ },
            params: [
                //
            ],
        }, close : {
            function: () => { /* console.log('CLOSE'); */ },
            params: [
                //
            ],
        }
    }) {
        super({ ...defaultProps, ...props }, { ...defaultState, ...state });
        this.setCallbacks(callbacks);
        for(const dropdown of document.querySelectorAll('.dropdown')){
            if(dropdown.id == this.props.id){
                this.setHTML(dropdown);
            }
        }
        this.setButton();
        this.setContent();
        this.checkState();
    }

    /**
     * * Check the Dropdown state values.
     * @memberof Dropdown
     */
    checkState () {
        this.checkOpenState();
        this.checkActiveState();
    }

    /**
     * * Check the Dropdown open state.
     * @memberof Dropdown
     */
    checkOpenState () {
        if (this.state.open) {
            this.open();
        }
    }

    /**
     * * Check the Dropdown active state.
     * @memberof Dropdown
     */
    checkActiveState () {
        if (this.state.active) {
            this.activate();
        }
    }

    /**
     * * Set the btn.
     * @param {object} properties - Dropdown properties.
     * @memberof Dropdown
     */
    setButton () {
        let dropdown = this;
        if (document.querySelector(`#${ this.props.id }.dropdown .dropdown-header .dropdown-button`)) {
            this.button = document.querySelector(`#${ this.props.id }.dropdown .dropdown-header .dropdown-button`);
            this.button.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.switch();
            });
        }
    }

    /**
     * * Set the Dropdown content.
     * @memberof Dropdown
     */
    setContent () {
        this.content = document.querySelector(`#${ this.props.id }.dropdown .dropdown-content`);
        this.html.style.setProperty('--height', this.content.offsetTop + 'px');
    }

    /**
     * * Switch the Dropdown open state.
     * @returns {boolean}
     * @memberof Dropdown
     */
    switch () {
        switch (this.state.open) {
            case true:
                this.close();
                return false;
            case false:
                this.open();
                return true;
        }
    }

    /**
     * * Open the Dropdown.
     * @memberof Dropdown
     */
    open () {
        this.setState('open', true);
        if(this.html.classList.contains('closed')){
            this.html.classList.remove('closed');
        }
        this.html.classList.add('opened');
        this.callbacks.open.function({
            ...this.callbacks.open.params,
            dropdown: this,
        });
    }

    /**
     * * Close the Dropdown.
     * @memberof Dropdown
     */
    close () {
        this.setState('open', false);
        if(this.html.classList.contains('opened')){
            this.html.classList.remove('opened');
        }
        this.html.classList.add('closed');
        this.callbacks.close.function({
            ...this.callbacks.close.params,
            dropdown: this,
        });
    }
}

// ? Default export
export default Dropdown;