const RED = 0
const BLUE = 1

function Pirata(x, y, tipo){
    this.id = setaId(x, y)
    this.imagem = document.createElement('img')
    if(!tipo){
        this.imagem.setAttribute('src', 'img/pirata1.png')        
    }else{
        this.imagem.setAttribute('src', 'img/pirata2.png')
    }
    this.imagem.setAttribute('id', this.id)
    this.imagem.draggable = true
    this.imagem.ondragstart = e =>
                e.dataTransfer.setData('id', e.target.id)
    this.x = x
    this.y = y
}

function setaId(x, y){
    if(y === 2){
        return x 
    }else{
        return x + 5
    }
}

function setaDropzones(){
    const dropzones = document.querySelectorAll('table tr td')
    dropzones.forEach(dropzone => {
        dropzone.ondragover = e => e.preventDefault()
        dropzone.ondrop = function(e) {
            const id = e.dataTransfer.getData('id')
            const item = document.getElementById(id)
            e.target.appendChild(item)
        }
    })
}

function criaPiratasAzuis(){
    piratasAzuis = []
    piratasAzuis.push(new Pirata(1,2, RED))
    piratasAzuis.push(new Pirata(2,2, RED))
    piratasAzuis.push(new Pirata(4,2, RED))
    piratasAzuis.push(new Pirata(5,2, RED))

    piratasAzuis.forEach(element => {
        let td = document.querySelector(`table tr td[x="${element.x}"][y="${element.y}"]`)
        td.appendChild(element.imagem)
    });
    return piratasAzuis
}

function criaPiratasVermelhos(){
    piratasAzuis = []
    piratasAzuis.push(new Pirata(1,6, BLUE))
    piratasAzuis.push(new Pirata(2,6, BLUE))
    piratasAzuis.push(new Pirata(4,6, BLUE))
    piratasAzuis.push(new Pirata(5,6, BLUE))

    piratasAzuis.forEach(element => {
        let td = document.querySelector(`table tr td[x="${element.x}"][y="${element.y}"]`)
        td.appendChild(element.imagem)
    });
    return piratasAzuis
}

function pirateTreasure(){
    setaDropzones()
    let piratasAzuis = criaPiratasAzuis()
    let piratasVermelhos = criaPiratasVermelhos()
}

pirateTreasure()