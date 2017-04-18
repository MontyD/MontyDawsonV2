interface LinkConfig {
    name: string,
    href: string
}

class ContextMenu {

    public element: HTMLElement;
    public open: boolean;
    private attachEvent: Function;

    constructor(links: Array<LinkConfig>, attachEvent: Function) {

        this.attachEvent = attachEvent;

        let el = document.createElement('nav');
        el.className = 'context-menu closed';
        el.style.left = '-500px';
        el.style.top = '-500px';

        links.forEach(link => {
            let aEl = document.createElement('a');
            aEl.title = link.name;
            aEl.innerHTML = link.name;
            aEl.href = link.href;
            el.appendChild(aEl);
        });

        this.element = el;
        document.body.appendChild(this.element);

        this.open = false;

        this.attachEvent('contextmenu', window, this.rightClick.bind(this));
        this.attachEvent('click', window, this.leftClick.bind(this));
    }

    rightClick(e?: MouseEvent) {
        if (e) {
            e.preventDefault();
        }
        this.open = !this.open;
        if (!this.open) {
            this.element.className = 'context-menu closed';
            this.element.style.left = '-500px';
            this.element.style.top = '-500px';
            return;
        }
        if (e) {
            this.element.style.left = e.pageX + 'px';
            this.element.style.top = e.pageY + 'px';
        }
        this.element.className = 'context-menu open';
    }

    leftClick() {
        if (this.open) {
            return this.rightClick();
        }
    }

}

export default ContextMenu;
