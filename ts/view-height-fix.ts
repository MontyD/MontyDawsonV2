const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const isHTMLElement = (element: Element): element is HTMLElement => !!((element as any).style);

export const viewHeightFix = (elementSelectors: string[] = []) => {
    if (isMobile()) {
        elementSelectors.forEach(el => {
            const element = document.querySelector(el);
            if (element && isHTMLElement(element)) {
                element.style.height = String(window.innerHeight + 20) + 'px';
            }
        });
    }
}
