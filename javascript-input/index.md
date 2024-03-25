# Javascript input
- [Javascript input](#javascript-input)
- [Excercise](#excercise)
  - [Solution](#solution)
- [Knowledge](#knowledge)
  - [Access the DOM](#access-the-dom)
    - [Access the DOM after it has been loaded](#access-the-dom-after-it-has-been-loaded)
  - [Adding elements](#adding-elements)
  - [Manipulating elements](#manipulating-elements)
    - [Selecting elements](#selecting-elements)
    - [Adding and removing classes](#adding-and-removing-classes)
      - [Adding class when an element appears on the screen](#adding-class-when-an-element-appears-on-the-screen)
    - [Adding event handlers](#adding-event-handlers)
      - [Useful event handlers](#useful-event-handlers)


# Excercise
In this excercise, we have a simple document that goes over some important parts of the HTML and javascript interaction:
- Accessing the DOM
- Adding and manipulating elements
- Detecting if an element is visible in the viewport
- Event listeners

All the topics covered in this excercise are also listed under [knowledge](#knowledge) and the solution to this excercise can be found under [solution](#solution).



## Solution
> See: [Excercise solution](excercise-solution)

# Knowledge

## Access the DOM
The Document Object Model(DOM) is an interface to interact with a web page. You can access the structure, style and content of a page and change it.
The DOM is accessed by using the `document` variable.

### Access the DOM after it has been loaded
It is a good practice to only access the DOM after the page has been fully loaded. Otherwise, you can run into errors.

One way of doing this is to add a function to the `window.onload` event. Example:
```javascript
window.onload = function(){
  // DOM has loaded, do stuff
  const myButton = document.querySelector("button")
}
```

## Adding elements
Elements can be added to the DOM by creating them in Javascript. To create an element, we use [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
```javascript
let newDiv = document.createElement("div");
```

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

#### Adding class when an element appears on the screen
We can detect when an element is visible on the screen. E.g. when the user scrolls and elements that have not been visible enter the viewport. To do so, we use can create a function that checks if the element is visible in the viewport. Example:
```javascript
function elementIsVisibleInViewport(element) {
    const { top, left, bottom, right } = element.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
```

Another options is the [mozilla.org - Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which can check if element is intersecting with a parent element.

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