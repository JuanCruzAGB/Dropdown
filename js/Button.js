// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Button controls the Dropdown Buttons.
 * @export
 * @class Button
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Button extends Class {
    /**
     * * Creates an instance of Button.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="button-1"] Button primary key.
     * @param {boolean} [data.state.active=false] Of the Button should be active.
     * @param {string} htmls Button HTML Element.
     * @param {Dropdown} Dropdown Button Dropdown parent.
     * @memberof Button
     */
    constructor (data = {
        props: {
            id: "button-1",
        }, state: {
            active: false,
        }, htmls, Dropdown,
    }) {
        super({ ...Button.props, ...((data && data.hasOwnProperty("props")) ? data.props : {}) });
        this.setHTMLs([ ...((data && data.hasOwnProperty("htmls")) ? data.htmls : []) ], data.Dropdown);
    }

    /**
     * * Set the Button HTML Elements.
     * @param {HTMLElement[]} htmls
     * @param {Dropdown} Dropdown Button Dropdown parent.
     * @memberof Button
     */
    setHTMLs (htmls = [], Dropdown) {
        if (!this.htmls) {
            this.htmls = [];
        }
        for (const html of htmls) {
            html.addEventListener("click", (e) => {
                Dropdown.switch(!this.state.active);
            });
            this.htmls.push(html);
        }
    }

    /**
     * * Active the Button.
     * @memberof Button
     */
    active () {
        this.setState("active", true);
        for (const html of this.htmls) {
            html.classList.add("active");
        }
    }

    /**
     * * Inactive the Button.
     * @memberof Button
     */
    inactive () {
        this.setState("active", true);
        for (const html of this.htmls) {
            html.classList.remove("active");
        }
    }

    /**
     * * Returns all the Dropdown Buttons.
     * @static
     * @param {Dropdown} Dropdown
     * @returns {Button[]}
     * @memberof Button
     */
    static generate (Dropdown) {
        let htmls = this.querySelector(Dropdown.props.id);
        return new this({
            props: {
                id: "button-1",
            }, state: {
                active: (() => {
                    for (const html of htmls) {
                        if (html.classList.contains("active")) {
                            return true;
                        }
                    }
                    return false;
                })(),
            }, htmls: htmls,
            Dropdown: Dropdown,
        });
    }

    /**
     * * Returns all the Dropdown Buttons HTMLElements.
     * @static
     * @param {string} id Dropdown primary key.
     * @returns {HTMLElement[]}
     * @memberof Button
     */
    static querySelector (id = false) {
        if (id) {
            return document.querySelectorAll(`.${ id }.dropdown-button`);
        }
        if (!id) {
            console.error("ID param is required to get the Dropdown Buttons");
            return [];
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "button-1",
    }

    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        active: false,
    }
}