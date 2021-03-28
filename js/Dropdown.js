// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

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
     * @param {string} [state.active=null] Dropdown active state.
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
        active: null,
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
        super(props, state);
        this.setCallbacks(callbacks);
        for(const dropdown of document.querySelectorAll('.dropdown')){
            if(dropdown.id == this.props.id){
                this.setHTML(dropdown);
            }
        }
        this.setChilds();
        this.setButton();
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
            this.callbacks.open.function({
                ...this.callbacks.open.params,
                dropdown: this,
            });
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
        for (const child of this.html.children) {
            if (child.classList.contains('dropdown-header')) {
                this.header = child;
                if (child.children.length) {
                    for (const subchild of child.children) {
                        if (subchild.classList.contains('dropdown-button')) {
                            this.button = subchild;
                        }
                    }
                }
            }
        }
        this.header.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.switch();
        });
    }

    /**
     * * Set the Dropdown childs.
     * @memberof Dropdown
     */
    setChilds () {
        this.childs = [];
        for (const dropdown of document.querySelectorAll(`#${ this.props.id } > li > .dropdown-link, #${ this.props.id } > li > .dropdown-buton`)) {
            this.childs.push(dropdown);
        }
    }

    /**
     * * Switch the Dropdown open state.
     * @returns
     * @memberof Dropdown
     */
    switch () {
        switch (this.state.open) {
            case true:
                console.log('Dropdown close');
                this.close();
                this.callbacks.close.function({
                    ...this.callbacks.close.params,
                    dropdown: this,
                });
                return false;
            case false:
                console.log('Dropdown open');
                this.open();
                this.callbacks.open.function({
                    ...this.callbacks.open.params,
                    dropdown: this,
                });
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
    }

    /**
     * * Active a Dropdown-link.
     * @memberof Dropdown
     */
    activate () {
        for (const child of this.childs) {
            console.log(child);
            console.log(this.state.active);
        }
    }
}

// ? Default export
export default Dropdown;