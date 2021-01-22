import {Slide} from "./slide.js"

export class Pool{
    constructor(id, i, j, maxNmOfSlides, name){
        this.id = id;
        this.x = i;
        this.y = j;
        this.name = name;
        this.numOfSlides = 0;
        this.Capacity = maxNmOfSlides;
        this.miniContainer = null;
        this.slides = [];
    }
    addSlide(slide){
        this.slides.push(slide);
    }
    drawPool(host){
        if (!host)
            throw new Exception("Roditeljski element ne postoji");
        this.miniContainer = document.createElement("div");
        this.miniContainer.className = "pool";
        this.miniContainer.innerHTML = "Prazno, " + ", " + this.numOfSlides + ", " + this.Capacity;
        host.appendChild(this.miniContainer);

        this.drawPoolForm(this.miniContainer);
        this.drawSlides();
    }
    drawPoolForm(host){
        const poolForm = document.createElement("div");
        poolForm.className = "contPoolForm";
        host.appendChild(poolForm);

        var elLabel = document.createElement("h4");
        elLabel.innerHTML = "Unos tobogana";
        poolForm.appendChild(elLabel);

        elLabel = document.createElement("label");
        elLabel.innerHTML = "Tip tobogana";
        poolForm.appendChild(elLabel);

        let tb = document.createElement("input");
        tb.className = "Tobogan";
        poolForm.appendChild(tb);

        elLabel = document.createElement("label");
        elLabel.innerHTML = "Broj tobogana";
        poolForm.appendChild(elLabel);

        tb = document.createElement("input");
        tb.className = "kolicina";
        tb.type = "number";
        poolForm.appendChild(tb);

        const btn = document.createElement("button");
        btn.innerHTML="Dodaj tobogan";
        poolForm.appendChild(btn);
        btn.onclick = (ev) => {
            const _type = this.miniContainer.querySelector(".Tobogan").value;
            const _num = parseInt(this.miniContainer.querySelector(".kolicina").value);
            fetch("https://localhost:5001/Aqua/UpisiSlide" + this.id, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    type: _type,
                    numOfSlides: _num,
                    poolID: this.id
                })
            }).then(s => {
                if(s.ok){
                    this.slides.addSlide(s);
                    fetch("https://localhost:5001/Aqua/IzmeniPool", {
                        method: "PUT",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify({
                            id: this.id,
                            x: this.x,
                            y: this.y,
                            name: this.name,
                            numOfSlides: this.numOfSlides + _num,
                            Capacity: maxNmOfSlides
                        })
                    })
                }
                else if (s == 406){
                    alert("Postoji tobogan");
                }
                else alert("Prekoracenje kapaciteta");
            });
            slide = new Slide(_type, _num);
            slide.drawSlide(this.miniContainer);
            /*let potencialSlide = this.slides.find(slide => slide.type === _type);
            if(potencialSlide)
                potencialSlide.updateSlide(_num);
            else{
                let slide = new Slide(_type, _num);
                this.addSlide(slide);
                slide.drawSlide(this.miniContainer);
            }*/
        }
    }
    drawSlides(){
        this.slides.forEach(slide => {
            slide.drawSlide(this.miniContainer);
        });
    }
    updatePool(id, x, y, name, numOfSlides, capacity){
        console.log("Pozvano azuriranje");
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.numOfSlides = numOfSlides;
        this.Capacity = capacity;
        this.miniContainer.innerHTML = this.name + ", " + this.numOfSlides + ", " + this.Capacity;
        this.drawPoolForm(this.miniContainer);
    }
}