const STYLES = {
    LTR: 'flex-row pad-left',
    RTL: 'flex-row-reverse pad-right',
    TTB: 'flex-col pad-top',
    BTT: 'flex-col-reverse pad-bottom'
}

export class TabPanel extends HTMLElement {

    lastPanelIndex = 0;

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const direction = this.getAttribute("direction") ?? "ttb";

        const DirectionCssRule =
            direction == "ltr" ? STYLES.LTR :
                direction == "rtl" ? STYLES.RTL :
                    direction == "ttb" ? STYLES.TTB :
                        direction == "btt" ? STYLES.BTT : STYLES.TTB;

        setTimeout(() => {
            this.shadowRoot.innerHTML = `
                <style>
                    :host{
                        overflow: auto;
                    }
                    .flex-row-reverse > div:nth-child(1) > div,
                    .flex-row > div:nth-child(1) > div
                    {
                        display:flex;
                        flex-direction: column;
                        overflow-y: auto;
                        overflow-x: hidden;
                    }
                    .flex-col-reverse > div:nth-child(1) > div,
                    .flex-col > div:nth-child(1) > div
                    {
                        display:flex;
                        flex-direction: row;
                        overflow-x: auto;
                        overflow-y: auto;
                    }
                    .flex-row{
                        display:flex;
                        flex-direction: row;
                        overflow: hidden;
                    }
                    .flex-row-reverse{
                        display:flex;
                        flex-direction: row-reverse;
                        overflow: hidden;
                    }
                    .flex-col{
                        display:flex;
                        flex-direction: column;
                        overflow: hidden;
                    }
                    .flex-col-reverse{
                        display:flex;
                        flex-direction: column-reverse;
                        overflow: hidden;
                    }
                    .pad-left > div:nth-child(2){
                        padding-left: 1rem;
                    }
                    .pad-right > div:nth-child(2){
                        padding-right: 1rem;
                    }
                    .pad-top > div:nth-child(2){
                        padding-top: 1rem;
                    }
                    .pad-bottom > div:nth-child(2){
                        margin-bottom: 1rem;
                    }
                    .stick-top-left{
                        background-color: white; 
                        position: sticky; 
                        top: 0; 
                        left: 0; 
                    }
                </style>
                <div id="container" class="${DirectionCssRule}">
                    <div>
                        <div class="stick-top-left" style="white-space: nowrap; height: 100%;">
                            <slot name="button"></slot>
                        </div>
                    </div>
                    <div style="overflow-x: auto; height: 100%">
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