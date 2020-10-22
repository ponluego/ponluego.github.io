## json para guarda parametros 
https://github.com/josdejong/jsoneditor

el CNAME meterlo en docs 


para recolocar el gui

```css
.moveGUI{ 
    position: absolute;
    top: 13.1em;
    right: -1em;
}
```
```JS

// Create GUI   
    gui = new dat.GUI( { autoPlace: false } );
    {
        // create fill and open folders
    }
    var customContainer = $('.moveGUI').append($(gui.domElement));
```
```HTML

<div  class = 'moveGUI'></div>
```