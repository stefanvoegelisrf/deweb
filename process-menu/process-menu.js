class ProcessMenu extends HTMLElement {
    shadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "closed" });
        const font = document.createElement("link");
        font.href = "https://fonts.googleapis.com/css2?family=Unbounded&display=swap";
        font.rel = "stylesheet"
        document.head.appendChild(font);

        window.CSS.registerProperty({
            name: '--menu-gradient-color-1',
            syntax: '<color>',
            inherits: false,
            initialValue: '#EB61CC'
        });
        window.CSS.registerProperty({
            name: '--menu-gradient-color-2',
            syntax: '<color>',
            inherits: false,
            initialValue: '#EB607A'
        });

        window.CSS.registerProperty({
            name: '--menu-gradient-angle',
            syntax: '<angle>',
            inherits: false,
            initialValue: '0deg'
        });

        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(`
        * {
            font-family: 'Unbounded', sans-serif;
            font-size: 16px;
        }

        #menu{
            display: flex;
            flex-direction: column;
            position: fixed;
            width: 16em;
            height: 27em;
            top: .5em;
            left: .5em;
            padding: .5em;
            border-radius: 1em;
            z-index: 1000;
            background: linear-gradient(var(--menu-gradient-angle), var(--menu-gradient-color-1), var(--menu-gradient-color-2));
            animation-name: menu-color-change;
            animation-duration: 10s;
            animation-iteration-count: infinite;
            animation-timing-function:linear;
            transition: all 0.5s;
            overflow: hidden;
            box-shadow: 0 0  .5em rgba(0,0,0,0.5);
        }

        .burger-line{
            width: 1em;
            height: .1em;
            background: white;
            display: inline-block;
            position: absolute;
            transition: all 0.5s;
        }

        .burger-top {
            top: 2px;
            transform-origin: top left;
        }

        .burger-middle {
            top: 7px;
            transform-origin: center center;
        }

        .burger-bottom {
            top: 12px;
            transform-origin: bottom left;
        }

        .close-active > .burger-top {
            transform: rotate(42deg);
        }

        .close-active > .burger-middle {
            scale: 0;
        }

        .close-active > .burger-bottom {
            transform: rotate(-42deg);
        }

        .reduced-menu {
            width: 1.5em !important;
            height: 1.5em !important;
        }

        .icon-container{
            position: relative;
            height: 1em;
            min-height: 1em;
            width: 1em;
            margin: .25em;
            cursor: pointer;
        }

        .icon{
            transition: all 1s;
        }

        .icon-hidden{
            visibility: hidden;
            opacity: 0;
        }

        #menu-open, #menu-close{
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
        }

        @keyframes menu-color-change {
            50% {
                --menu-gradient-color-1: #A060EB;
                --menu-gradient-color-2: #EB7160;
            }
            100%{
                --menu-gradient-color-1: #EB61CC;
                --menu-gradient-color-2: #EB607A;
                --menu-gradient-angle: 360deg;
            }
        }

        ul {
            text-align: center;
            list-style: none;
            padding: 0;
            margin: 1em 0 1em 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            transition: font-size 0.5s;
        }

        .links-hidden{
            opacity: 0;
            width: 0;
            height: 0;
            font-size: 1px;
        }

        li, a{
            font-size: inherit;
        }


        li{
        }

        a {
            mix-blend-mode: plus-lighter;
            color: rgb(100,100,100);
        }

        a:link {
            text-decoration: none;
        }
        a:hover{
            text-decoration: underline;
        }

        .home-icon{
            height: 1.1em;
            vertical-align: text-top;
            transition: all 0.5s;
        }
        .links-hidden>li>a>.home-icon{
            height: .1em;
        }
        .home-icon>path{
            fill: rgb(100,100,100);
        }
        
        `)
        this.shadowRoot.adoptedStyleSheets = [styleSheet];
    }
    // The browser calls this method when the element is
    // added to the DOM.
    connectedCallback() {
        let baseUrl = "";
        if (window.location.hostname.includes("localhost") || window.location.hostname.includes("127.0.0.1")) {
            baseUrl = "";
        } else {
            baseUrl = "/kiweb";
        }
        let menuDiv = document.createElement('div');
        menuDiv.id = 'menu';
        menuDiv.classList.add('reduced-menu');

        let menuControlsDiv = document.createElement('div');
        menuControlsDiv.id = 'menu-controls';
        menuControlsDiv.addEventListener('click', () => {
            this.toggleMenu(this.shadowRoot);
        });
        menuControlsDiv.classList.add('icon-container');

        let burgerTop = document.createElement('span');
        burgerTop.classList.add('burger-line');
        burgerTop.classList.add('burger-top');
        menuControlsDiv.appendChild(burgerTop);

        let burgerMiddle = document.createElement('span');
        burgerMiddle.classList.add('burger-line');
        burgerMiddle.classList.add('burger-middle');
        menuControlsDiv.appendChild(burgerMiddle);

        let burgerBottom = document.createElement('span');
        burgerBottom.classList.add('burger-line');
        burgerBottom.classList.add('burger-bottom');
        menuControlsDiv.appendChild(burgerBottom);

        menuDiv.appendChild(menuControlsDiv);

        let linkList = document.createElement('ul');
        linkList.id = "link-list";
        linkList.classList.add('links-hidden');

        let listElementHome = document.createElement('li');
        let linkHome = document.createElement('a');
        linkHome.href = `${baseUrl}/start-page`;
        linkHome.innerHTML = `
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" class="home-icon">
          <path fill-rule="evenodd" d="M11.2 1.65a2 2 0 00-2.4 0L1.885 6.836a2.017 2.017 0 00-.783 1.907c.145.99.398 2.92.398 4.257 0 1.11-.175 2.638-.32 3.702C1.019 17.899 1.94 19 3.178 19h13.646c1.236 0 2.16-1.1 1.997-2.298-.145-1.064-.32-2.592-.32-3.702 0-1.337.253-3.268.398-4.257a2.017 2.017 0 00-.783-1.907L11.2 1.65zM3.085 8.436L10 3.25l6.915 5.186.001.001.002.003a.025.025 0 010 .013C16.776 9.435 16.5 11.5 16.5 13c0 1.258.193 2.903.338 3.97v.013a.035.035 0 01-.014.017H14v-5a4 4 0 00-8 0v5H3.176c-.001 0-.004-.002-.006-.005a.035.035 0 01-.007-.012.026.026 0 010-.012c.144-1.068.337-2.713.337-3.971 0-1.5-.275-3.565-.419-4.547l.001-.013.003-.004zM8 17h4v-5a2 2 0 10-4 0v5z"/>
        </svg> Home`
        listElementHome.appendChild(linkHome);
        linkList.appendChild(listElementHome);

        let listElementBrockmann = document.createElement('li');
        let linkBrockmann = document.createElement('a');
        linkBrockmann.href = `${baseUrl}/brockmann/musica-viva-1`;
        linkBrockmann.innerHTML = "Brockmann";
        listElementBrockmann.appendChild(linkBrockmann);
        linkList.appendChild(listElementBrockmann);

        let listElementMikeJoyce = document.createElement('li');
        let linkMikeJoyce = document.createElement('a');
        linkMikeJoyce.href = `${baseUrl}/mike-joyce/`;
        linkMikeJoyce.innerHTML = "The Police";
        listElementMikeJoyce.appendChild(linkMikeJoyce);
        linkList.appendChild(listElementMikeJoyce);

        let listElementPendulumSwing = document.createElement('li');
        let linkPendulumSwing = document.createElement('a');
        linkPendulumSwing.href = `${baseUrl}/pendulum-swing-with-motion/`;
        linkPendulumSwing.innerHTML = "Pendulum";
        listElementPendulumSwing.appendChild(linkPendulumSwing);
        linkList.appendChild(listElementPendulumSwing);

        let listElementAlternatingCircles = document.createElement('li');
        let linkAlternatingCircles = document.createElement('a');
        linkAlternatingCircles.href = `${baseUrl}/alternating-circles/`;
        linkAlternatingCircles.innerHTML = "Alternate Circles";
        listElementAlternatingCircles.appendChild(linkAlternatingCircles);
        linkList.appendChild(listElementAlternatingCircles);

        let listElementMatterJsIntroduction = document.createElement('li');
        let linkMatterJsIntroduction = document.createElement('a');
        linkMatterJsIntroduction.href = `${baseUrl}/codingtrain-matterjs-introduction/`;
        linkMatterJsIntroduction.innerHTML = "Matter.js";
        listElementMatterJsIntroduction.appendChild(linkMatterJsIntroduction);
        linkList.appendChild(listElementMatterJsIntroduction);

        let listElementGradientWheel = document.createElement('li');
        let linkGradientWheel = document.createElement('a');
        linkGradientWheel.href = `${baseUrl}/gradient-wheel/`;
        linkGradientWheel.innerHTML = "Gradient Wheel";
        listElementGradientWheel.appendChild(linkGradientWheel);
        linkList.appendChild(listElementGradientWheel);

        let listElementColorDance = document.createElement('li');
        let linkColorDance = document.createElement('a');
        linkColorDance.href = `${baseUrl}/color-dance/`;
        linkColorDance.innerHTML = "Color Dance";
        listElementColorDance.appendChild(linkColorDance);
        linkList.appendChild(listElementColorDance);

        let listElementQuirkySkateboard = document.createElement('li');
        let linkQuirkySkateboard = document.createElement('a');
        linkQuirkySkateboard.href = `${baseUrl}/skate-scrolly/`;
        linkQuirkySkateboard.innerHTML = "Quirky Skate";
        listElementQuirkySkateboard.appendChild(linkQuirkySkateboard);
        linkList.appendChild(listElementQuirkySkateboard);

        let listElementGradientColorChange = document.createElement('li');
        let linkGradientColorChange = document.createElement('a');
        linkGradientColorChange.href = `${baseUrl}/gradient-color-change/`;
        linkGradientColorChange.innerHTML = "Gradient Change";
        listElementGradientColorChange.appendChild(linkGradientColorChange);
        linkList.appendChild(listElementGradientColorChange);

        let listElementHeads = document.createElement('li');
        let linkHeads = document.createElement('a');
        linkHeads.href = `${baseUrl}/heads/`;
        linkHeads.innerHTML = "Heads";
        listElementHeads.appendChild(linkHeads);
        linkList.appendChild(listElementHeads);

        let listElement3dSpinner = document.createElement('li');
        let link3dSpinner = document.createElement('a');
        link3dSpinner.href = `${baseUrl}/heads/3d-spinner/`;
        link3dSpinner.innerHTML = "3D Spinner";
        listElement3dSpinner.appendChild(link3dSpinner);
        linkList.appendChild(listElement3dSpinner);

        let listElementSlotMachine = document.createElement('li');
        let linkSlotMachine = document.createElement('a');
        linkSlotMachine.href = `${baseUrl}/heads/slot-machine/`;
        linkSlotMachine.innerHTML = "Slot Machine";
        listElementSlotMachine.appendChild(linkSlotMachine);
        linkList.appendChild(listElementSlotMachine);

        let listElementFireworks = document.createElement('li');
        let linkFireworks = document.createElement('a');
        linkFireworks.href = `${baseUrl}/fireworks/`;
        linkFireworks.innerHTML = "Fireworks";
        listElementFireworks.appendChild(linkFireworks);
        linkList.appendChild(listElementFireworks);

        let listElementProcessMenu = document.createElement('li');
        let linkProcessMenu = document.createElement('a');
        linkProcessMenu.href = `${baseUrl}/process-menu/`;
        linkProcessMenu.innerHTML = "Process Menu";
        listElementProcessMenu.appendChild(linkProcessMenu);
        linkList.appendChild(listElementProcessMenu);

        let listElementFlashingLight= document.createElement('li');
        let linkFlashingLight = document.createElement('a');
        linkFlashingLight.href = `${baseUrl}/effects/flashing-light/`;
        linkFlashingLight.innerHTML = "Flashing Light";
        listElementFlashingLight.appendChild(linkFlashingLight);
        linkList.appendChild(listElementFlashingLight);

        let listElementLightArray = document.createElement('li');
        let linkLightArray = document.createElement('a');
        linkLightArray.href = `${baseUrl}/effects/light-array/`;
        linkLightArray.innerHTML = "Light Array";
        listElementLightArray.appendChild(linkLightArray);
        linkList.appendChild(listElementLightArray);

        let listElementSweatyPassion = document.createElement('li');
        let linkSweatyPassion = document.createElement('a');
        linkSweatyPassion.href = `${baseUrl}/sweaty-passion/`;
        linkSweatyPassion.innerHTML = "Sweaty Passion";
        listElementSweatyPassion.appendChild(linkSweatyPassion);
        linkList.appendChild(listElementSweatyPassion);

        menuDiv.appendChild(linkList);
        this.shadowRoot.appendChild(menuDiv);
    }
    onShowMenu(shadowRoot) {
        let linkList = shadowRoot.querySelector("#link-list");
        let menuDiv = shadowRoot.querySelector("#menu");
        let menuControlsDiv = shadowRoot.querySelector("#menu-controls");
        menuControlsDiv.classList.add('close-active');
        menuDiv.classList.remove('reduced-menu');
        linkList.classList.remove('links-hidden');
    }
    onHideMenu(shadowRoot) {
        let linkList = shadowRoot.querySelector("#link-list");
        let menuDiv = shadowRoot.querySelector("#menu");
        let menuControlsDiv = shadowRoot.querySelector("#menu-controls");
        menuControlsDiv.classList.remove('close-active');
        menuDiv.classList.add('reduced-menu');
        linkList.classList.add('links-hidden');
    }
    toggleMenu(shadowRoot) {
        let menuDiv = shadowRoot.querySelector("#menu");
        if (menuDiv.classList.contains('reduced-menu')) {
            this.onShowMenu(shadowRoot);
        } else {
            this.onHideMenu(shadowRoot);
        }
    }
}

// Register the component using the tag name <process-menu>.
window.customElements.define('process-menu', ProcessMenu);