import { TabPanel } from "../src/tab-panel.js";

describe("Tab-Panel Component", () => {
    it("Check Tag Name", () => {
        expect(new TabPanel().tagName).toBe("TAB-PANEL");
    });

    it("Unit Test - setAttributesByInputs", () => {
        let elem = {
            style: {}
        };
        new TabPanel().setAttributesByInputs(elem, 100, 100);
        expect(elem.style.width).toBe(100);
        expect(elem.style.height).toBe(100);
    });

    it("Unit Test - changeTab", () => {
        let elem1 = {
            style: {}
        };
        let elem2 = {
            style: {}
        };

        const panels = [elem1, elem2];

        const newSelectedIndex = new TabPanel().changeTab(panels, 1, 0);
        expect(newSelectedIndex).toBe(1);
        expect(panels[0].style.display).toBe('none');
        expect(panels[1].style.display).toBe('block');
    });

    it("Unit Test - attachEventToButtons - Panel Change Control", () => {
        let elem1 = {
            style: {
                display: "block"
            }
        };
        let elem2 = {
            style: {
                display: "block"
            }
        };

        let btn1 = document.createElement("button");
        let btn2 = document.createElement("button");

        const buttons = [btn1, btn2];
        const panels = [elem1, elem2];

        new TabPanel().attachEventToButtons(buttons, panels);
        expect(panels[0].style.display).toBe('block');
        expect(panels[1].style.display).toBe('none');

        btn2.click();

        expect(panels[0].style.display).toBe('none');
        expect(panels[1].style.display).toBe('block');
    });

    it("Unit Test - connectedCallback", () => {
        const tabPanel = document.createElement("tab-panel");

        const panel1 = document.createElement("div");
        const panel2 = document.createElement("div");

        panel1.setAttribute("slot", "content");
        panel2.setAttribute("slot", "content");

        panel1.innerHTML = `<div>Hello World!</div>`
        panel2.innerHTML = `<div>Good Bye!</div>`

        const button1 = document.createElement("button");
        const button2 = document.createElement("button");

        button1.setAttribute("slot", "button");
        button2.setAttribute("slot", "button");

        tabPanel.appendChild(panel1);
        tabPanel.appendChild(panel2);
        tabPanel.appendChild(button1);
        tabPanel.appendChild(button2);


        document.body.appendChild(tabPanel);
        setTimeout(() => {
            expect(tabPanel.innerHTML).toContain("Hello World!");
            expect(tabPanel.innerHTML).toContain("Good Bye!");

            
            expect(window.getComputedStyle(panel1).display).toBe("block");
            expect(window.getComputedStyle(panel2).display).toBe("none");

            button2.click();

            expect(window.getComputedStyle(panel1).display).toBe("none");
            expect(window.getComputedStyle(panel2).display).toBe("block");

            button1.click();

            expect(window.getComputedStyle(panel1).display).toBe("block");
            expect(window.getComputedStyle(panel2).display).toBe("none");
        })
    });
});