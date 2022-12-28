export class TabPanel extends HTMLElement {

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

            const container = this.shadowRoot.querySelector("#container");
            const panels = this.querySelectorAll(".panel");
            const buttons = this.querySelectorAll(".button");

            this.setAttributesByInputs(
                container,
                this.getAttribute("width") ?? "400px",
                this.getAttribute("height") ?? "400px"
            );

            this.attachEventToButtons(buttons, panels);
        });
    }

    attachEventToButtons(buttons, panels) {
        buttons
            .forEach((val, index) => {
                if (index != 0) {
                    panels[index].style.display = "none";
                }
                val.onclick = () => {
                    this.lastPanelIndex = this.changeTab(panels, index, this.lastPanelIndex);
                }
            });
    }

    setAttributesByInputs(element, width, height) {
        element.style.width = width;
        element.style.height = height;
    }

    changeTab(panels, index, lastIndex) {
        panels[lastIndex].style.display = "none";
        panels[index].style.display = "block";
        return index;
    }
}
window.customElements.define('tab-panel', TabPanel);