/* Styles */
import './nav-menu.scss';

/* Template */
/* If you import the template here instead of html, it will not be rendered during the build process */
import template from 'html-loader!./nav-menu.html';

class NavMenuComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        //this.innerHTML = template;

        console.log('site-starter: init nav-menu component');
    }
}

customElements.define('nav-menu', NavMenuComponent);
