import { attachEvent } from '../dom';

class ContextMenu {

    constructor(links) {
        if (!links || !links.length) {
            return;
        }

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

        attachEvent('contextmenu', window, this.rightClick.bind(this));
        attachEvent('click', window, this.leftClick.bind(this));
    }

    rightClick(e) {
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
        this.element.style.left = e.pageX + 'px';
        this.element.style.top = e.pageY + 'px';
        this.element.className = 'context-menu open';
    }

    leftClick() {
        if (this.open) {
            return this.rightClick();
        }
    }

}

export default ContextMenu;
