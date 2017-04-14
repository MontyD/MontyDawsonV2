export default (window.requestAnimationFrame ||
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    function(callback: Function) : void {
        window.setTimeout(callback, 1000 / 60)
    }).bind(window);
