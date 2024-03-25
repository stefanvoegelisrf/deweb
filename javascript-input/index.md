# Javascript input
- [Javascript input](#javascript-input)
- [Excercise](#excercise)
  - [Basic setup](#basic-setup)
    - [Adding a javascript file](#adding-a-javascript-file)
    - [Accessing the DOM](#accessing-the-dom)
    - [Adding elements dynamically](#adding-elements-dynamically)
    - [Checking if an element is visible](#checking-if-an-element-is-visible)
      - [Add function to check if element is visible](#add-function-to-check-if-element-is-visible)
      - [Adding scroll event listener](#adding-scroll-event-listener)
    - [Finished](#finished)
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

## Basic setup
We assume that the basic HTML page is already set up as `index.html` and there is already a CSS document `style.css` referenced.

To get started, use the prepared [excercise template](excercise-template/). Download it to a local folder.

### Adding a javascript file
In the same folder as the `index.html`, create a file called `script.js`. In the `index.html` file, we need to reference this file. To do so, we add the following line in the `head` section of the HTML document.
```html
<script src="script.js"></script>
```
From this point on, we start to write javascript and we will be able to access the HTML document.

### Accessing the DOM
To make sure that our document has loaded all the content when we want to manipulate it with javascript, we can add a function to `window.onload` in the `script.js` file.
```javascript
window.onload = function () {
}
```

Now we want to access the DOM and get the `main` element inside the DOM. We can do this by adding the following line:
```javascript
const main = document.querySelector("main");
```
By calling `document`, we access the HTML page. With using the `querySelector` function, we can search for the `main` element inside the HTML page.

Now we have assigned the `main` element of the page to our variable `main` and we can manipulate it.

### Adding elements dynamically
If we want to add an element dynamically, we can create an element in javascript. We can do this like so:
```javascript
const firstDynamicElement = document.createElement("div");
```

Now we have only created the element, but we need to add it to our main part of the HTML. We can do this with `appendChild`. Add the following line in our javascript.
```javascript
main.appendChild(firstDynamicElement);
```

Our dynamic element does not have any text or styling, so we need to add that.

We will add a text with the following line:
```javascript
firstDynamicElement.innerText = "I'm the first dynamic element";
```

To style the element, add a class to the element:
```javascript
firstDynamicElement.classList.add("dynamic-element", "first");
```
The example `style.css` file already contains styling for these classes, so we don't need to add styling manually.

After completing this step, we should now see our element on the page.

### Checking if an element is visible
Next, we want to check if an element is visible on the screen. We can do this with javascript, but first, let's add another dynamic element:
```javascript
// Create the second dynamic element
const secondDynamicElement = document.createElement("div");
secondDynamicElement.innerText = "I'm the second dynamic element";
secondDynamicElement.classList.add("dynamic-element", "second");
main.appendChild(secondDynamicElement);
```

To check if an element is visible, we can use the following functionality:
```javascript
function elementIsVisibleInViewport(element) {
    // Get the bounding box of the element
    const { top, left, bottom, right } = element.getBoundingClientRect();
    // Get the viewport dimensions
    const { innerHeight, innerWidth } = window;
    // Check if top, left, bottom, right are all within the viewport
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
```
> This is a very basic implementation, to get a more complete implementation, have a look at [30secondsofcode.org - Element is visible in Viewport](https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/)

By using `getBoundingClientRect` we can retrieve the position values of an element.

After we have these values, we get the `innerHeight` and `innerWidth` of the browser window.

We use these values to compare them and decide if the current element is visible in the viewport.

#### Add function to check if element is visible
Our function is not getting called yet, so we need to add that part. First, let's add a function that checks if our second dynamic element is visible in the viewport:
```javascript
function checkIfSecondElementIsVisible() {
    // Get the second element
    const secondElement = document.querySelector(".second");
    // Check if the second element is visible
    if (elementIsVisibleInViewport(secondElement)) {
        console.log("Second element is fully visible");
        // Add class to transition the border radius
        secondElement.classList.add("border-radius-transition")
    }
    else {
        console.log("Second element is not fully visible anymore");
        secondElement.classList.remove("border-radius-transition")
    }
}
```
In this function, we add a class to the element if it is fully visible, and we remove it if the element is not fully visible.

#### Adding scroll event listener
Now we add an event listener for the scroll element. Like that, our function `checkIfSecondElementIsVisible` will be called, when the user is scrolling on the page.
```javascript
document.addEventListener("scroll", checkIfSecondElementIsVisible);
```
Add this part inside the function that we have defined for `window.onload`.

### Finished
Now, when we scroll on the page, our second dynamic element should change the border-radius when we scroll down and it is fully inside the viewport.

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