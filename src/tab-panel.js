export class TabPanel extends HTMLElement {

    lastPanelIndex = 0;

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const isHorizontal = this.hasAttribute("horizontal");
        setTimeout(() => {
            this.shadowRoot.innerHTML = `
                <style>
                    :host{
                        overflow: auto;
                    }
                    .flex-row{
                        display:flex;
                        flex-direction: row;
                    }
                    .flex-col{
                        display:flex;
                        flex-direction: column;
                    }
                    .stick-top-left{
                        background-color: white; 
                        position: sticky; 
                        top: 0; 
                        left: 0; 
                    }
                </style>
                <div id="container" class="${isHorizontal?'flex-row':'flex-col'}">
                    <div style="padding-bottom: ${!isHorizontal?'1rem':''};">
                        <div class="${isHorizontal?'flex-col':'flex-row'} stick-top-left" style="white-space: nowrap;overflow: auto; height: 100%; ${isHorizontal?'overflow-x:hidden':''} ">
                            <slot name="button"></slot>
                        </div>
                    </div>
                    <div style="overflow-x: auto; padding-left:${isHorizontal?'1rem':''};">
                        <slot name="content"></slot>
                    </div>
                </div>
            `;

            const container = this.shadowRoot.querySelector("#container");
            const panels = this.querySelectorAll("[slot='content']");
            const buttons = this.querySelectorAll("[slot='button']");

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