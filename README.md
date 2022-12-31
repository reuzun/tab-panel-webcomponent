# TabPanel - Web Component

A light-weight tab panel component with allowing limitless panels without any content restriction.

size - 1.92KiB

![image](https://user-images.githubusercontent.com/73116832/209718725-211336f9-1a86-4a8e-a7c3-29eb16874951.png)

# How to install?
```
npm install @reuzun/tabpanel-webcomponent
```

# How to use?

Nth button changes content to Nth content.

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

# Properties

| Command | Description | Default | Allowed Values
| --- | --- | --- | --- |
| `width` | Width of the tab-panel | 400px | Same with css.
| `height` | Width of the tab-panel | 400px | Same with css.
| `direction` | Direction of buttons to Content | 'ltr' | 'ltr', 'rtl', 'ttb', 'btt'


| ltr | rtl | ttb | btt|
| --- | --- | --- | --- |
| <img src="https://user-images.githubusercontent.com/73116832/210154855-6ca4c56d-334f-43ae-a7a2-e11369ac2253.png" width="275" height="105"> | <img src="https://user-images.githubusercontent.com/73116832/210154842-51b43e14-2e23-46d8-835a-a68835534ceb.png" width="275" height="105"> |<img src="https://user-images.githubusercontent.com/73116832/210154943-c8247514-e48c-47a1-b833-45efd1fb2939.png" width="275" height="105"> | <img src="https://user-images.githubusercontent.com/73116832/210155040-5799e0cf-49cb-477b-892d-42de9a15ffb1.png" width="275" height="105">|


# How to run demo?

```
cd demo
npm install
```

* open demo.html

# LICENSE
Licensed under [MIT License](LICENSE).