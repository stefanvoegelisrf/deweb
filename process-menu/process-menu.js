class ProcessMenu extends HTMLElement {
    shadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "closed" });
        const font = document.createElement("link");
        font.href = "https://fonts.googleapis.com/css2?family=Unbounded&display=swap";
        font.rel = "stylesheet"
        document.head.appendChild(font);

        const iconFont = document.createElement("link");
        iconFont.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        iconFont.rel = "stylesheet"
        document.head.appendChild(iconFont);

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

        .material-icons-outlined {
            font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 1.5em;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
            color: white;
        }

        #menu{
            display: flex;
            flex-direction: column;
            position: fixed;
            width: 16em;
            height: 16em;
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
            line-height: 1em;
            transition: all 0.5s;
        }

        .row{
            width: 100%;
        }

        #menu-open, #menu-close{
            cursor: pointer;
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

        li{
        }

        a {
            mix-blend-mode: plus-lighter;
            color: rgb(100,100,100);
        }

        a:link {
            text-decoration: none;
        }

        a:visited {
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

        let menuControlsDiv = document.createElement('div');
        menuControlsDiv.classList.add('row');

        let menuIconSpan = document.createElement('span');
        menuIconSpan.classList.add('material-icons-outlined');
        menuIconSpan.innerHTML = "menu";
        menuIconSpan.id = "menu-open";
        menuIconSpan.addEventListener('click', () => {
            this.onShowMenu(this.shadowRoot);
        });
        menuControlsDiv.appendChild(menuIconSpan);

        let menuCloseIconSpan = document.createElement('span');
        menuCloseIconSpan.classList.add('material-icons-outlined');
        menuCloseIconSpan.classList.add('hidden');
        menuCloseIconSpan.innerHTML = "close";
        menuCloseIconSpan.id = "menu-close";
        menuCloseIconSpan.addEventListener('click', () => {
            this.onHideMenu(this.shadowRoot);
        });
        menuControlsDiv.appendChild(menuCloseIconSpan);

        menuDiv.appendChild(menuControlsDiv);

        let linkList = document.createElement('ul');
        linkList.id = "link-list";
        linkList.classList.add('row');

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

        menuDiv.appendChild(linkList);
        this.shadowRoot.appendChild(menuDiv);
    }
    onShowMenu(shadowRoot) {
        let menuIconSpan = shadowRoot.querySelector("#menu-open");
        let menuCloseIconSpan = shadowRoot.querySelector("#menu-close");
        let linkList = shadowRoot.querySelector("#link-list");
        linkList.classList.remove('hidden');
        menuIconSpan.classList.add('hidden');
        menuCloseIconSpan.classList.remove('hidden');
    }
    onHideMenu(shadowRoot) {
        let menuIconSpan = shadowRoot.querySelector("#menu-open");
        let menuCloseIconSpan = shadowRoot.querySelector("#menu-close");
        let linkList = shadowRoot.querySelector("#link-list");
        linkList.classList.add('hidden');
        menuIconSpan.classList.remove('hidden');
        menuCloseIconSpan.classList.add('hidden');
    }
}

// Register the CurrentDate component using the tag name <current-date>.
window.customElements.define('process-menu', ProcessMenu);