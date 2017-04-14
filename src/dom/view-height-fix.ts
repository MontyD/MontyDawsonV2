class ViewHeightFix {

    constructor(selectors: Array<string>) {

        if (!this.isMobile()) {
            return;
        }
        selectors.forEach(selector => {
            let domElements: Array<HTMLElement> = Array.prototype.slice.call(document.querySelectorAll(selector));
            domElements.forEach(el =>  el.style.height = String(window.innerHeight + 20) + 'px');
        });

    }

    private isMobile(): boolean {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

}

export default ViewHeightFix;
