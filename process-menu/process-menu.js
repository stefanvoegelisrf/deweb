class ProcessMenu extends HTMLElement {
    constructor() {
        super();
        const font = document.createElement("link");
        font.href = "https://fonts.googleapis.com/css2?family=Unbounded&display=swap";
        font.rel = "stylesheet"
        document.head.appendChild(font);
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
        const now = new Date();
        this.style.fontFamily = "Unbounded, sans-serif";
        let menuDiv = document.createElement('div');
        menuDiv.innerHTML = `Menu`;
        menuDiv.style.position = 'fixed';
        menuDiv.style.top = '50%';
        menuDiv.style.transform = 'translateY(-50%)';
        menuDiv.style.left = '0';
        menuDiv.style.backgroundColor = 'red';
        menuDiv.style.padding = '10px';
        menuDiv.style.borderRadius = '10px';
        let linkList = document.createElement('ul');
        linkList.style.listStyle = 'none';
        linkList.style.padding = '0';

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
        menuDiv.appendChild(linkList);
        this.appendChild(menuDiv);
    }
}

// Register the CurrentDate component using the tag name <current-date>.
window.customElements.define('process-menu', ProcessMenu);