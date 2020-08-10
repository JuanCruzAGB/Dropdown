/**
 * * Icon controls the Dropdow icon button.
 * @export
 * @class Icon
 */
export class Icon{
    /**
     * * Creates an instance of Icon.
     * @memberof Icon
     */
    constructor(html = undefined){
        this.setHTML(html);
        this.setStates();
    }

    /**
     * * Set the Icon states.
     * @memberof Icon
     */
    setStates(){
        this.states = {};
        this.setOpen();
    }

    /**
     * * Set the Icon open state.
     * @memberof Icon
     */
    setOpen(){
        this.states.open = false;
    }

    /**
     * * Set the Icon HTML Element.
     * @param {HTMLElement} html - Icon HTML Element.
     * @memberof Icon
     */
    setHTML(html = undefined){
        this.html = html;
    }

    /**
     * * Switch the Dropdown icon open state.
     * @memberof Dropdown
     */
    switch(){
        switch(this.states.open){
            case true:
                    this.close();
                break;
            case false:
                    this.open();
                break;
        }
    }

    /**
     * * Open the Dropdown icon button.
     * @memberof Dropdown
     */
    open(){
        this.states.open = true;
        if(this.html.classList.contains('fa-sort-down')){
            this.html.classList.remove('fa-sort-down');
        }
        this.html.classList.add('fa-sort-up');
    }

    /**
     * * Close the Dropdown icon button.
     * @memberof Dropdown
     */
    close(){
        this.states.open = false;
        if(this.html.classList.contains('fa-sort-up')){
            this.html.classList.remove('fa-sort-up');
        }
        this.html.classList.add('fa-sort-down');
    }
}