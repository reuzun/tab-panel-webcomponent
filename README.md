# TabPanel - Web Component

A light-weight tab panel component with allowing limitless panels without any content restriction.

size - 1.26KiB

![image](https://user-images.githubusercontent.com/73116832/209718725-211336f9-1a86-4a8e-a7c3-29eb16874951.png)

# How to install?
```
npm install @reuzun/tabpanel-webcomponent
```

# How to use?
```html
<script src="./node_modules/@reuzun/tabpanel-webcomponent/dist/tab-panel.js"></script>

<tab-panel width="75%" height="250px">
    <anything slot="button"></anything>
    <anything slot="content"></anything>    
    <anything slot="button"></anything>
    <anything slot="content"></anything>
</tab-panel>

<tab-panel width="300px" height="700px" horizontal>
    <anything slot="content"></anything>    
    <anything slot="content"></anything>
    <anything slot="button"></anything>
    <anything slot="button"></anything>
</tab-panel>
```

*Note-1: Content and button count should be equal for a valid usage.*

*Note-2: Order of content and buttons are not important!*

Use horizontal attribute for horizontal aligment between button container and content container.

![image](https://user-images.githubusercontent.com/73116832/210152548-111b8da9-ed84-4605-a0ea-41563613f17e.png)

# How to run demo?

```
cd demo
npm install
```

* open demo.html

# LICENSE
Licensed under [MIT License](LICENSE).