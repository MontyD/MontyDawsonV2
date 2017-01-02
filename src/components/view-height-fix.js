class ViewHeightFix {

    constructor(elements) {

        if (this.isMobile()) {
            elements.forEach(el => {
                let element = document.querySelector(el);
                if (element) {
                    element.style.height = String(window.innerHeight + 20) + 'px';
                }
            });
        }

    }

    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

}

export default ViewHeightFix;
