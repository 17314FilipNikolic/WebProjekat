import {Pool} from "./pool.js"

export class Park{
    constructor(id, name, n, m, capacity){
        this.id = id;
        this.name = name;
        this.n = n;
        this.m = m;
        this.capacity = capacity;
        this.container = null;
        this.pools = [];
    }

    addPool(pool){
        this.pools.push(pool);
    }

    drawPark(host){
        if (!host)
            throw new Exception("Roditeljski element ne postoji");
        this.container = document.createElement("div");
        this.container.classList.add("container");
        host.appendChild(this.container);

        this.drawForm(this.container);
        this.drawPools(this.container);

        fetch("https://localhost:5001/Aqua/PreuzmiPool").then(p => {
            p.json().then(data => {
                data.forEach(pool => {
                    this.pools[pool.x * this.n + pool.y].updatePool(pool.id, pool.x, pool.y, pool.name, pool.numOfSlides, pool.capacity)
                });
            });
        });
    }

    drawForm(host){
        const contForm = document.createElement("div");
        contForm.className = "contForm";
        host.appendChild(contForm);

        var elLabel = document.createElement("h3");
        elLabel.innerHTML="Unos bazena";
        contForm.appendChild(elLabel);

        elLabel = document.createElement("label");
        elLabel.innerHTML = "Ime bazena";
        contForm.appendChild(elLabel);

        let tb = document.createElement("input");
        tb.className = "name";
        contForm.appendChild(tb);

        let option = null;
        let label = null;
        let divRb = document.createElement("div");
        let selX = document.createElement("select");
        label = document.createElement("label");
        label.innerHTML = "X:"
        divRb.appendChild(label);
        divRb.appendChild(selX);

        for (let i = 0; i < this.m; i++) {
            option = document.createElement("option");
            option.innerHTML = i;
            option.value = i;
            selX.appendChild(option);
        }

        contForm.appendChild(divRb);

        let selY = document.createElement("select");
        label = document.createElement("label");
        label.innerHTML = "Y:"
        divRb.appendChild(label);
        divRb.appendChild(selY);

        for (let i = 0; i < this.n; i++) {
            option = document.createElement("option");
            option.innerHTML = i;
            option.value = i;
            selY.appendChild(option);
        }

        contForm.appendChild(divRb);

        const btn = document.createElement("button");
        btn.innerHTML = "Dodaj bazen";
        contForm.appendChild(btn);

        btn.onclick = (ev) => {
            const _name = this.container.querySelector(".name").value;

            let x = parseInt(selX.value);
            let y = parseInt(selY.value);

            // Ovde je zamenjena kompletna provera upisa, koja je prebačena na server. Uvek je bolje takve promene vršiti na serveru.
            /*let potencialPool = this.pools.find(pool => pool.name == _name && (pool.x != x || pool.y != y));
            if (potencialPool)
                alert("Postoji bazen sa navedenim imenom! Lokacija je (" + potencialPool.x + "," + potencialPool.y + ")");
            else
                this.pools[x * this.n + y].updatePool(_name, this.capacity);*/


            fetch("https://localhost:5001/Aqua/UpisiPool/" + this.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: _name,
                    x: x,
                    y: y
                })
            }).then(p => {
                if (p.ok) {
                    this.pools[x * this.n + y].updatePool(_name, 0, this.capacity);
                }
                else if (p.status == 400) {
                    const errorLoc = { x: 0, y: 0 };
                    p.json().then(q => {
                        errorLoc.x = q.x;
                        errorLoc.y = q.y;
                        alert("Postoji nepopunjena lokacija sa navedenim mestom! Lokacija je (" + errorLoc.x + "," + errorLoc.y + ")");
                    });
                }
                else {
                    alert("Greška prilikom upisa.");
                }
            }).catch(p => {
                alert("Greška prilikom upisa.");
            });
        }
    }
    drawPools(host) {
        const contPools = document.createElement("div");
        contPools.className = "contPool";
        host.appendChild(contPools);
        let raw;
        let pool;
        for (let i = 0; i < this.m; i++) {
            raw = document.createElement("div");
            raw.className = "row";
            contPools.appendChild(raw);
            for (let j = 0; j < this.n; j++) {
                pool = new Pool(i, j, this.capacity, "");
                this.addPool(pool);
                pool.drawPool(raw);
            }
        }
    }
}