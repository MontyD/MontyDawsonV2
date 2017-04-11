class ViewHeightFix {

    constructor(elements: Array<string>) {

        if (!this.isMobile()) {
            return;
        }
        elements.forEach(el => {
            let element = <HTMLElement>document.querySelector(el);
            if (element) {
                element.style.height = String(window.innerHeight + 20) + 'px';
            }
        });

    }

    private isMobile(): boolean {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

}

export default ViewHeightFix;
