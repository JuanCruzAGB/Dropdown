// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? Dropdown repository
import Button from "./Button.js";

/**
 * * Dropdown makes an excellent dropdown.
 * @export
 * @class Dropdown
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Dropdown extends Class {
    /**
     * * Creates an instance of Dropdown.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="dropdown-1"] Dropdown primary key.
     * @param {object} [data.state]
     * @param {boolean} [data.state.open=false] If the Dropdown should be opened.
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.close]
     * @param {function} [data.callbacks.close.function]
     * @param {object} [data.callbacks.close.params]
     * @param {object} [data.callbacks.open]
     * @param {Function0} [data.callbacks.open.function]
     * @param {object} [data.callbacks.open.params]
     * @param {object} [data.callbacks.switch]
     * @param {Function0} [data.callbacks.switch.function]
     * @param {object} [data.callbacks.switch.params]
     * @memberof Dropdown
     */
    constructor (data = {
        props: {
            id: "dropdown-1",
        }, state: {
            open: false,
        }, callbacks: {
            close : {
                function: (params) => { /* console.log(params); */ },
                params: {},
            }, open: {
                function: (params) => { /* console.log(params); */ },
                params: {},
            }, switch: {
                function: (params) => { /* console.log(params); */ },
                params: {},
            }, 
        },
    }) {
        super({ ...Dropdown.props, ...((data && data.hasOwnProperty("props")) ? data.props : {}) }, { ...Dropdown.state, ...((data && data.hasOwnProperty("state")) ? data.state : {}) });
        this.setCallbacks({ ...Dropdown.callbacks, ...((data && data.hasOwnProperty("callbacks")) ? data.callbacks : {}) });
        this.setHTML(`${ this.props.id }.dropdown`);
        this.setButton();
        this.setContent();
        this.checkState();
    }

    /**
     * * Set the Dropdown Button.
     * @memberof Dropdown
     */
    setButton () {
        this.button = Button.generate(this);
    }

    /**
     * * Check the Dropdown state values.
     * @memberof Dropdown
     */
    checkState () {
        this.checkOpenState();
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
     * * Close the Dropdown.
     * @param {object} [params]
     * @memberof Dropdown
     */
    close (params = {}) {
        this.setState("open", false);
        this.html.classList.remove("opened");
        this.button.inactive();
        this.execute("close", {
            ...params,
            ...this.callbacks.close.params,
            open: this.state.open,
            Dropdown: this,
        });
    }
    
	/**
     * * Open the Dropdown.
     * @param {object} [params]
     * @memberof Dropdown
     */
    open (params = {}) {
        this.setState("open", true);
        this.html.classList.add("opened");
        this.button.active();
        this.execute("open", {
            ...params,
            ...this.callbacks.open.params,
            open: this.state.open,
            Dropdown: this,
        });
    }

    /**
     * * Switch the Dropdown open state.
     * @returns {boolean}
     * @memberof Dropdown
     */
    switch (open = false, params = {}) {
        if (typeof open != "boolean") {
            console.error("Open param is required & should be a boolean, to switch the Dropdown");
            return false;
        }
        switch (open) {
            case true:
                this.close();
                break;
            case false:
                this.open();
                break;
        }
        this.execute("switch", {
            ...params,
            ...this.callbacks.switch.params,
            open: open,
            Dropdown: this,
        });
        return open;
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "dropdown-1",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        open: false,
    }
    
    /**
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        close : {
            function: (params) => { /* console.log(params); */ },
            params: {},
        }, open: {
            function: (params) => { /* console.log(params); */ },
            params: {},
        }, switch: {
            function: (params) => { /* console.log(params); */ },
            params: {},
        }, 
    }

    /** 
     * @static
     * @var {Button} Button
     */
    static Button = Button
}