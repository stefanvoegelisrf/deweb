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
            height: 20em;
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
        }

        .links-hidden{
            opacity: 0;
            width: 0;
            height: 0;
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

        let listElementBrockmann = document.createElement('li');
        let linkBrockmann = document.createElement('a');
        linkBrockmann.href = `${baseUrl}/brockmann/musica-viva-1`;
        linkBrockmann.innerHTML = "Brockmann";
        listElementBrockmann.appendChild(linkBrockmann);
        linkList.appendChild(listElementBrockmann);

        let listElementMikeJoyce = document.createElement('li');
        let linkMikeJoyce = document.createElement('a');
        linkMikeJoyce.href = `${baseUrl}/mike-joyce/`;
        linkMikeJoyce.innerHTML = "Mike Joyce";
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
        linkAlternatingCircles.innerHTML = "Alternating Circles";
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
        linkQuirkySkateboard.innerHTML = "Skate";
        listElementQuirkySkateboard.appendChild(linkQuirkySkateboard);
        linkList.appendChild(listElementQuirkySkateboard);

        let listElementGradientColorChange = document.createElement('li');
        let linkGradientColorChange = document.createElement('a');
        linkGradientColorChange.href = `${baseUrl}/gradient-color-change/`;
        linkGradientColorChange.innerHTML = "Gradient Color";
        listElementGradientColorChange.appendChild(linkGradientColorChange);
        linkList.appendChild(listElementGradientColorChange);

        let listElementHeads = document.createElement('li');
        let linkHeads = document.createElement('a');
        linkHeads.href = `${baseUrl}/heads/`;
        linkHeads.innerHTML = "Heads";
        listElementHeads.appendChild(linkHeads);
        linkList.appendChild(listElementHeads);

        let listElement3dSpinner= document.createElement('li');
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

        let listElementProcessMenu = document.createElement('li');
        let linkProcessMenu = document.createElement('a');
        linkProcessMenu.href = `${baseUrl}/process-menu/`;
        linkProcessMenu.innerHTML = "Process Menu";
        listElementProcessMenu.appendChild(linkProcessMenu);
        linkList.appendChild(listElementProcessMenu);

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