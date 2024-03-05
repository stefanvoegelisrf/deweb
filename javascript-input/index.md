# Javascript input
- [Javascript input](#javascript-input)
  - [Adding elements](#adding-elements)
  - [Manipulating elements](#manipulating-elements)
    - [Selecting elements](#selecting-elements)
    - [Adding and removing classes](#adding-and-removing-classes)
    - [Adding event handlers](#adding-event-handlers)
      - [Useful event handlers](#useful-event-handlers)


## Adding elements

## Manipulating elements
Javascript allows access to the DOM(document object model) of our html page.

### Selecting elements
To select elements by its id, use [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById). This will return an element object which you can manipulate. Example:
```javascript
document.getElementById('add-button');
```

To select elements by its class, use [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName). This will return a collection of elements. Example:
```javascript
document.getElementsByClassName('gradient-circle');
```

To select elements that match a more specific selection, use [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector). This will return the first matching element. Example:
```javascript
document.querySelector(".pendulum-circle");
```

Selectors can also be combined to search for elements within elements.Example:
```javascript
document.getElementById("pendulum-circle-box-red").querySelector(".pendulum-circle");
```

### Adding and removing classes
You can easily change the style of an element by adding or removing css classes. This is done by manipulating the classlist of an element. Example:
```javascript
let circle1 = document.getElementById("circle1");
// Remove the class at position 1 of the classlist
circle1.classList.remove(circle1.classList[1]);
circle1.classList.add("border-solid");
```

### Adding event handlers
Event handlers are important to make a site react to user input. There are a lot of event handlers available, which serve different purposes. A list can be found here. [mozilla.org - Events](https://developer.mozilla.org/en-US/docs/Web/API/Event)

Event handlers can be assigned in multiple ways, one of which is to do it directly in javascript. Example:
```javascript
let rotationSlider = document.getElementById('rotation-slider');
rotationSlider.addEventListener('input', onRotationChanged);
```

#### Useful event handlers
While there are a lot of event handlers, here are some useful event handlers to make our page interactive.
- [w3schools.com - Animation events](https://www.w3schools.com/jsref/obj_animationevent.asp)
  - Events for detecting when an animation starts, ends or loops
- [mozilla.org - Device orientation event](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)
  - Event for detecting when a device(smartphone) is rotated.
- [mozilla.org - Drag event](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
  - Events for detecting when an element is dragged around
- [mozilla.org - Mouse event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
  - Events for detecting mouse movement or actions like clicking
- [mozilla.org - Touch event](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
  - Event for detecting touches and touch movement when a touch device is used
- [mozilla.org - Input event](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent)
  - Events for detecting manipulation of editable elements, like a text field or a slider