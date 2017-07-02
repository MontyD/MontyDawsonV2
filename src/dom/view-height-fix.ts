class viewHeightFix {

  constructor(selectors: string[]) {

    if (!this.isMobile()) {
      return;
    }
    selectors.forEach((selector) => {
      const domElements: HTMLElement[] = Array.prototype.slice.call(
        document.querySelectorAll(selector),
      );
      domElements.forEach(el =>  el.style.height = String(window.innerHeight + 20) + 'px');
    });

  }

  private isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

}

export default viewHeightFix;
