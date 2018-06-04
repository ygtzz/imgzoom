# LazyLoad

a component to zoom images

## Installation
```bash
npm i my-imgzoom -S
```

## Usage
```html
<div class="smallc">
    <img id="smallimg" src="./images/userimg.jpg" alt="" data-big="./images/userimg-big.jpg" class="smallimg">
    <div class="j-smallmask smallmask"></div>
</div>
```
```javascript
import {ImgZoom} from 'my-imgzoom';

new ImgZoom({
    smallc:'.smallc'
});
```   

## Params

Parameter | Type |Default| Description
--------- | ---- | ------|-----------
data-big  | `string` |  | attribute to store big image src
smallc    | `string` |  | small image selector,used in document.querySelector


