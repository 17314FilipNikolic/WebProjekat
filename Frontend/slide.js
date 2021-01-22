export class Slide{
    constructor(_type, num, idPool){
        this.type = _type;
        this.numOfSlides = num;
        this.poolID = idPool;
        this.nanoContainer = null;
    }
    drawSlide(host){
        if (!host)
            throw new Exception("Roditeljski element ne postoji");
        this.nanoContainer = document.createElement("div");
        this.nanoContainer.className = "slide";
        this.nanoContainer.innerHTML = this.type + ", " + this.numOfSlides;
        host.appendChild(this.nanoContainer);
    }
    updateSlide(num){
        this.numOfSlides += num;
        this.nanoContainer.innerHTML = this.type + ", " + this.numOfSlides;
    }
}