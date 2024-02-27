# Kickstart Web Development
- [Kickstart Web Development](#kickstart-web-development)
  - [Wiki for module](#wiki-for-module)
  - [Project](#project)
  - [Game Project](#game-project)
  - [Journal](#journal)
    - [20.02.2024](#20022024)
      - [Brockmann poster](#brockmann-poster)
      - [CSS Animation resources](#css-animation-resources)
      - [Fabulouscss excercise](#fabulouscss-excercise)
      - [Resources and inspiration](#resources-and-inspiration)
    - [27.02.2024](#27022024)
      - [Mike Joyce poster](#mike-joyce-poster)
      - [Matter.js](#matterjs)
      - [Accessing device sensors](#accessing-device-sensors)


## Wiki for module
> See: [github.com - KickWeb2024](https://github.com/digitalideation/KickWeb2024/wiki)

## Project
> See: [Project](project)

## Game Project
> See: [Game](gameproject)

## Journal

### 20.02.2024
We took a look at the basics on HTML and CSS. I focused on working for myself. To see what I achieved, view my documentation below.

#### Brockmann poster
Todays topic were mostly repetition, which is why I focused on recreating a first poster and animate it with css. I chose a poster of Josef Müller-Brockmann of his series "Musica viva". This was an easy example and allows for playful experimentation.

Regarding the font choice, I used Roboto, as it is similar to Akzidenz-Grotesk, which Brockmann uses. See: [github.com - Josef Müller-Brockmann Essay](https://williamipark.github.io/IXD102-Josef-Muller-Brockmann-Essay/index.html)

> See: [Brockmann poster](brockmann/musica-viva-1/)

The implementation was easy, but also a bit challenging, as I am not an expert with CSS animations. I had some issues with the positioning of the elements before and after the animation. The state of the element can be controlled with the css `animation-fill-mode`. By setting this to `forwards` or `backwards`, we can choose what state the element should have after the animation is finished. As I wanted to have an animation that only plays once, to make the elements appear, this was necessary.

#### CSS Animation resources
While implementing the poster, I came across a valuable resource for css animations: [codepen.io - CSS Animation](https://codepen.io/nelledejones/pen/gOOPWrK)

Another helpful resource for CSS animations is also [w3schools - CSS Animations](https://www.w3schools.com/css/css3_animations.asp)

#### Fabulouscss excercise
> I have also created a version of the fabulouscss excercise, which can be found here: [fabulouscss](tag1/fabulouscss/)


#### Resources and inspiration
An important an helpful resource here was, how to import Google Fonts purely with CSS, as we were not allowed to change the html. See: [w3docs.com - how to import Google fonts in CSS file](https://www.w3docs.com/snippets/css/how-to-import-google-fonts-in-css-file.html)

We were given a handful of useful visual inspiration, which is listed below:
- [newrafael.com](https://www.newrafael.com/)
  - creative and abstract websites
- [hallointer.net](https://hallointer.net/)
  - Showcase of various creative websites
- [knoth-renner.com](https://knoth-renner.com/)
  - Showcase of various creative websites

### 27.02.2024
We had repetition on CSS-Selector and an input on flexbox. I am not an expert in flexbox, but have used it quite a lot already and look up the necessary parts, when I have to. I have worked on other topics today, which are documented below.

#### Mike Joyce poster
For today, our preparation is to choose our poster, which we can to create. I will choose a work of Mike Joyce due to the fact, that it reminded me of an idea, that i wanted to realize anyway. He did this work for his SwissTed project which can be found here: [swissted.com](https://www.swissted.com/)

![Poster of Mike Joyce - The Police](mike-joyce-the%20police.jpeg)

The work this reminded me of, is the work of Felipe Pantone. See: [instagram.com - Felipe Pantone](https://www.instagram.com/felipepantone/). He has a lot of physical artwork, that creates visually appealing color combinations with movable (i assume) plexyglass disks. I wan to combine this with the poster and create digital versions of the physical artworks.

> My first attempt to create the poster is here: [Mike Joyce - The Police](mike-joyce/index.html)

My first implementation aimed to look quite like the original poster. To make it somewhat responsive, I chose to have some breakpoints and adjust the root element width.

I used a grid for the layout of the grid with the circles. I created it on [grid.layoutit.com](https://grid.layoutit.com/). The circles itself are positioned at the center of the containing cell. I apply a `transform` to shift the circles up, down, left and right.

As the circles on the poster play with the mix of the colors, I applied the `mix-blend-mode: multiply;` to achieve a similar effect like on the poster.

As for animation, I went on to just make the circles alternate in position either up or down. This creates a nice effect of the colors mixing together.

For interactivity, I added a hover effect, which disables the animation. This leads to the effect, that the animaton goes out of sync and after hovering over multiply elements, the grid is quite mixed up.

I might continue to a better implementation of this poster in a different form, but for now, I will try to do a work of Felipe Pantone.

#### Matter.js
As I want to have a poster/experience, that can mix colors, similar to this video [Felipe Pantone - Pendulum color mix](https://www.instagram.com/p/CoUqdGtADxr/), I have started to look at a javascript library called [github.com - matter.js](https://github.com/liabru/matter-js).

![Felipe Pantone - Pendulum Video Screenshot](pantone%20pendulum%20frame.png)

Matter.js is quite easy to use, as I figured out with a tutorial from Daniel Shiffmann. See: [youtube.com - 5.17: Introduction to Matter.js - The Nature of Code](https://www.youtube.com/watch?v=urR596FsU68)

For now, I kept it simple and downloaded a version of p5.js and matter.js to a folder and included it in the html directly. For the final projects, I aim to use Vite for packaging javascript.

Matter.js provides it's own renderer, but in the tutorial, p5.js is used to have more control on how the content is rendered.

Below is the basic code, created in the tutorial which has some basic functionality, where you can click on the screen and place boxes. The boxes fall down with gravity onto a floor.

```javascript
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var world;
var boxes = [];
var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Runner.run(engine);
    ground = Bodies.rectangle(200, height, width, 20, { isStatic: true });
    Composite.add(world, ground);
}

function mousePressed() {
    let newBox = new CustomBox(mouseX, mouseY, random(20, 40), random(20, 40));
    boxes.push(newBox);
}

function draw() {
    background(220);
    for (let customBox of boxes) {
        customBox.show();
    }
}
```

The code for the CustomBox below, initializes a class which has a matter.js body and adds it to the world. The box is then drawn using p5.js.
```javascript
class CustomBox {
    constructor(x, y, width, height) {
        this.body = Bodies.rectangle(x, y, width, height, { friction: 0.5, restitution: 1, airFriction: 0 });
        this.width = width;
        this.height = height;
        Composite.add(world, this.body);
    }
    show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();

    }
}
```

> The working example can be tried out here: [Falling boxes](codingtrain-matterjs-introduction/)

#### Accessing device sensors
To try out, how I can access the sensor data of a device, I have started a testpage.

> See: [Sensor testpage](sensors-testpage/)

This page displays the acceleration and the orientation. Acceleration is not available on desktop for most devices. Orientation can be simulated in the browser.

> To simulate the orientation, go into dev tools and then click on `More tools` and then `Sensors`
> ![More Tools Sensors](tools-sensors.png)
>
> Once opened, the value for alpha, beta and gamma can be adjusted with a little preview.
> ![Simulate Orientation](simulate-orientation.png)