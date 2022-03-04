const RED = 0
const BLUE = 1
const DIAGONAL = 0
const NORMAL = 1
let turno = BLUE
let piratasAzuis
let piratasVermelhos

function Pirata(x, y, tipo){
    this.id = setaId(x, y)
    this.imagem = document.createElement('img')
    if(!tipo){
        this.imagem.setAttribute('src', 'img/pirata1.png')        
    }else{
        this.imagem.setAttribute('src', 'img/pirata2.png')
    }
    this.imagem.setAttribute('id', this.id)
    this.imagem.setAttribute('x', x)
    this.imagem.setAttribute('y', y)
    this.imagem.setAttribute('xAntigo', x)
    this.imagem.setAttribute('yAntigo', y)
    this.imagem.draggable = true
    this.imagem.ondragstart = e => {
                    e.dataTransfer.setData('id', e.target.id)                  
                }
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
            dropzoneFunction(e)
        }
    })
}

function dropzoneFunction(e) {
    const id = e.dataTransfer.getData('id')
    const item = document.getElementById(id)
    const xAntigo = item.getAttribute('x')
    const yAntigo = item.getAttribute('y')
    

    if((turno === BLUE && id < 6) || (turno === RED && id > 5)){
        return
    }

    if(validaMovimentoUnico(e.target.getAttribute('x'), e.target.getAttribute('y'), xAntigo, yAntigo)) return

    if (verificarDirecao(e.target.getAttribute('x'), e.target.getAttribute('y'), xAntigo, yAntigo)){
        if(verificaSeExistePersonagem(e.target.getAttribute('x'), e.target.getAttribute('y'))){
            return
        }
    }else{
        if(!verificaSeExistePersonagem(e.target.getAttribute('x'), e.target.getAttribute('y'))){
            return
        }
        const parent = document.querySelector(`table tr td[x="${e.target.getAttribute('x')}"][y="${e.target.getAttribute('y')}"]`)
        const child = document.querySelector(`table tr td[x="${e.target.getAttribute('x')}"][y="${e.target.getAttribute('y')}"] img`)
        parent.removeChild(child)
    }

    if(verificaVitoria(e.target.getAttribute('x'),e.target.getAttribute('y'))){
        console.log("Ganhou")
    }

    item.setAttribute('xAntigo', xAntigo)
    item.setAttribute('yAntigo', yAntigo)
    item.setAttribute('x', e.target.getAttribute('x'))
    item.setAttribute('y', e.target.getAttribute('y'))
    const elemento = document.querySelector(`table tr td[x="${e.target.getAttribute('x')}"][y="${e.target.getAttribute('y')}"]`)
    elemento.appendChild(item)
    console.log(elemento)
    turno === BLUE ? turno = RED : turno = BLUE
}

function verificaVitoria(x, y) {
    if(turno == BLUE){
        if(x == 3 && y == 1) return true
    }else{
        if(x == 3 && y == 7) return true
    }
}

function validaMovimentoUnico(x, y, xAntigo, yAntigo){
    if(Math.abs(x - xAntigo) > 1 || Math.abs(y - yAntigo) > 1){
        return true
    }
    return false
}

function verificaSeExistePersonagem(x, y){
    let td = document.querySelector(`table tr td[x="${x}"][y="${y}"] img`)
    if(td !== null){
        return true
    }
    return false
}

function verificarDirecao(x, y, xAntigo, yAntigo) {
    if(x === xAntigo || y === yAntigo) return NORMAL
    return DIAGONAL
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

function criaCampo(){
    const tabela = document.querySelector("table")
    for(i = 1; i <= 7; i++){
        let tr = document.createElement('tr')
        for(j = 1; j <= 5; j++){
            let td = document.createElement('td')
            td.setAttribute('x', j)
            td.setAttribute('y', i)
            if(j === 3 && (i === 1 || i === 7)){
                td.className = "tesouro"
            }
            tr.appendChild(td)
        }
        tabela.appendChild(tr)
    }
}


function pirateTreasure(){
    setaDropzones()
    piratasAzuis = criaPiratasAzuis()
    piratasVermelhos = criaPiratasVermelhos()
}

criaCampo()
pirateTreasure()