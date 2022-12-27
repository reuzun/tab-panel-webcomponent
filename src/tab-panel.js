class TabPanel extends HTMLElement {

    panels = [];
    lastPanelIndex = 0;

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        setTimeout(() => {
            this.shadowRoot.innerHTML = `
                <style>
                    :host{
                        overflow: auto;
                    }
                </style>
                <div id="container" style="display:flex; flex-direction: column;">
                    <div id="button-container" style="width: 100%;background-color: white; position: sticky; top: 0; left: 0; border-bottom: 1px gray solid; padding-bottom: 1rem;">
                        <div style="display:flex; flex-direction: row; white-space: nowrap; overflow: auto;">
                            <slot name="button"></slot>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        <slot class="panel" name="content"></slot>
                    </div>
                </div>
            `;

            this.shadowRoot.querySelector("#container").style.width =
                this.getAttribute("width") ?? "400px";
            this.shadowRoot.querySelector("#container").style.height = 
                this.getAttribute("height") ?? "400px";

            this.panels = this.querySelectorAll(".panel");

            this.querySelectorAll(".button")
                .forEach((val, indx) => {
                    if (indx != 0) {
                        this.panels[indx].style.display = "none";
                    }
                    val.onclick = () => {
                        this.panels[this.lastPanelIndex].style.display = "none";
                        this.panels[indx].style.display = "block";
                        this.lastPanelIndex = indx;
                    }
                });
        });
    }
}
window.customElements.define('tab-panel', TabPanel);