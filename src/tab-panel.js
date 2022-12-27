class TabPanel extends HTMLElement {
    _panels = [];
    _buttonContentMap = new Map();
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
            <div id="container" style="display:flex; flex-direction: column; align-self: end">
            <div id="button-container" style="width: 100%;background-color: white;position: sticky;top: 0;left: 0;border-bottom: 1px gray solid;padding-bottom: 1rem;">
                <div style="display:flex;flex-direction: row; white-space:nowrap;overflow: auto;">
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

            this._panels = this.querySelectorAll(".panel");
            this.querySelectorAll(".button")
                .forEach((val, indx) => {
                    if (indx != 0) {
                        this._panels[indx].style.display = "none";
                    }
                    this._buttonContentMap.set(val, this._panels[indx]);
                    val.onclick = () => {
                        this._panels.forEach((panel, index) => {
                            panel.style.display = "none";
                        })
                        this._buttonContentMap.get(val).style.display = "block";
                    }
                })
        });
    }
}
window.customElements.define('tab-panel', TabPanel);