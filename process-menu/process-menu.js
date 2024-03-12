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

        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(`
        *{
            font-family: 'Unbounded', sans-serif;
            font-size: 16px;
        }
        .material-icons-outlined {
            font-variation-settings: 'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
        .menu{
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            background-color: red;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
        }
        ul{
            list-style: none;
            padding: 0;
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
        menuDiv.classList.add('menu');

        let menuIconSpan = document.createElement('span');
        menuIconSpan.classList.add('material-icons-outlined');
        menuIconSpan.innerHTML = "menu";
        menuDiv.appendChild(menuIconSpan);

        let linkList = document.createElement('ul');

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
}

// Register the CurrentDate component using the tag name <current-date>.
window.customElements.define('process-menu', ProcessMenu);