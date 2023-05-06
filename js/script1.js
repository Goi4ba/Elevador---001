
class Elevador{    
    constructor() {
        this.totalAndares = 7
        this.capacidade = 5
        this.andarAtual = 7
        this.totalPessoas = 0
        this.status = "Ligado"
        this.verifica = document.querySelector('.bt').value
        this.andar = document.querySelector('.andar')        
        this.qtdPessoa = document.querySelector('.qtdPes')
        this.elevador = document.querySelector('.espElev')
    }

    abrirPorta() {
        let pE = document.querySelector('.pE')
        let pD = document.querySelector('.pD')

        if(this.status == "Ligado"){
            if (this.verifica == 'Abrir') {
                setTimeout(()=>{
                    pE.classList.remove('fecharEsq')
                    pD.classList.remove('fecharDir')
                    pE.classList.add('abrirEsq')
                    pD.classList.add('abrirDir')
                    this.verifica = 'Fechar'
                },1000)
            } else {
                setTimeout(()=>{
                    pE.classList.remove('abrirEsq')
                    pD.classList.remove('abrirDir')
                    pE.classList.add('fecharEsq')
                    pD.classList.add('fecharDir')
                    this.verifica = 'Abrir'
                },1000)
            }  
        }else{
            console.log("Pronto")
        }
    }

    verificaPorta(v) {
        let andarAtual = this.andarAtual
        let andar = this.andar
        if(this.status == "Ligado"){
            if (v == 'Fechar' || v == 'Abrir') {
                setTimeout(function() {
                    if (andarAtual == 7)
                        andar.innerHTML = `Térreo` 
                    else 
                        andar.innerHTML = `Andar ${7-andarAtual}`               
                    
                    document.querySelector('.bt').click() //fechar a porta automaticamente
                },3000)

                if (v == 'Fechar')
                    this.andar.innerHTML = 'Portas abertas, fechando portas...'
                else
                    this.andar.innerHTML = 'Portas fechadas, abrindo Portas...' 
            }
        }
        
    }

    movimentarElevador(v,pos) {
        let div = document.querySelectorAll('.andares')[pos]
        let elev = document.querySelector('.espElev')
        if(this.status == "Ligado"){
            if (v == "subir" || v == "descer") {
                setTimeout(()=> {
                    div.appendChild(elev)
                    window.location.href = `#${pos}` //redirecionamento na página
                    const audioDoCino=document.querySelector('Audio')
                    audioDoCino.play()
                },1000)                       
            } 
        }
               
    }

    subir(v) {
        if(this.status == "Ligado"){
            if (this.verifica == "Fechar")
                this.verificaPorta(this.verifica)
            else {
                if(this.andarAtual > 0 && 7-this.andarAtual <= this.totalAndares) {
                    this.andarAtual -= v
                    
                    this.movimentarElevador("subir",this.andarAtual)

                    if (this.andarAtual == 0)
                        this.andar.innerHTML = `Último andar, não podemos subir!`
                    else{
                        this.andar.innerHTML = `Andar ${7-this.andarAtual}`
                    }
                    
                
                } else {
                    let andar = this.andar
                    this.andar.innerHTML = `O elevador Não pode subir desse ponto`            
                }
            }      
        }else{
            console.log("Ligue o elevador")
        }
          
    }
    
    descer(v) {
        if(this.status == "Ligado"){
            if (this.verifica == "Fechar")
                this.verificaPorta(this.verifica)
            else {
                if(this.andarAtual < 7 && 7-this.andarAtual <= this.totalAndares) {
                    this.andarAtual += v
                    
                    this.movimentarElevador("descer",this.andarAtual)

                    if (this.andarAtual == 7)
                        this.andar.innerHTML = `Térreo!`
                    else{
                        this.andar.innerHTML = `Andar ${7-this.andarAtual}`
                    }
                    
                
                } else {
                    let andar = this.andar
                    this.andar.innerHTML = `O elevador Não pode descer desse ponto`            
                    setTimeout(function() {
                        andar.innerHTML = `Não podemos descer`  
                    }, 3000)
                }
            }        
        }else{
            console.log("Ligue o elevador!")
        }
        
    }
    
    entrar(v) {
        if(this.status == "Ligado"){
            if (this.verifica == "Abrir")
                this.verificaPorta(this.verifica)
            else {
                if ((v + this.totalPessoas) <= this.capacidade) {
                    this.inserir(this.totalPessoas+1,'entrar')
                    this.totalPessoas += v
                    this.qtdPessoa.innerHTML = this.totalPessoas                
                } else {
                    this.andar.innerHTML = 'Alcançada a capacidade limite'
                    setTimeout(()=> {                    
                        document.querySelector('.bt').click()
                        if (this.andarAtual == 7)
                            this.andar.innerHTML = `Térreo`
                        else
                            this.andar.innerHTML = `Andar ${7-this.andarAtual}`
                    },3000)
                }
            }
        }else{
            console.log("Ligue o elevador agora!")
        }
        
    }

    sair(v) {
        if(this.status == "Ligado"){
            if (this.verifica  == "Abrir")
                this.verificaPorta(this.verifica )
            else {
                if (this.totalPessoas > 0) {
                    this.inserir(this.totalPessoas,'sair')
                    this.totalPessoas -= v
                    this.qtdPessoa.innerHTML = this.totalPessoas                
                }
                else {
                    this.andar.innerHTML = 'Não Existem pessoas nesse andar'
                    setTimeout(()=> {                    
                        document.querySelector('.bt').click()
                        if (this.andarAtual == 7)
                            this.andar.innerHTML = `Térreo`
                        else
                            this.andar.innerHTML = `Andar ${7-this.andarAtual}`
                    },3000)
                }
            }
        }else{
            console.log("Ligue o nosso elevador!")
        }
        
    }

    inserir(v,caso) {
        let pes = document.querySelector('.pes')
        let imgPes = document.createElement('img')
        if (caso == 'entrar') {
            imgPes.src = `images/pes${v}.png`
            imgPes.setAttribute('id',`img${v}`)        
            pes.appendChild(imgPes)
        }
        else {
            let img = document.querySelector(`div #img${v}`)
            img.remove()
        }
    }
}


function iniciar() {
    let body = document.querySelector('body')
    let inic = document.querySelector('.inic')
    let script = document.createElement('script')
    let coisa = 0

    if (inic.value == "Inicializar") {
        if(coisa == 0){
            iniciarElevador = new Elevador()
            body.appendChild(script) 
            iniciarElevador.status = "Ligado"
            inic.style.backgroundColor = 'green'
            inic.value = "Desligar"
            coisa += 2
        }
    }else if(inic.value == "Desligar") {
        iniciarElevador.status = "Desligado"
        inic.style.backgroundColor = 'red'
        inic.value = "Iniciar2"
        coisa += 3
    }else if(inic.value == "Iniciar2"){
        iniciarElevador.status = "Ligado"
        inic.style.backgroundColor = 'green'
        inic.value = "Desligar"
        coisa += 1
    }

    
}

function preparaAndar() {
    let body = document.querySelector('body')

    for (let i = 0; i < 8; i++) {        
        let div = document.createElement('div')

        div.classList.add('andares')
        div.setAttribute('id',i)
        div.style.background = `url(images/img${i}.jpeg)`
        div.style.backgroundSize = "100%"
        
        let link = document.createElement('a')
        link.href = `#${i}`
        link.style.opacity = 0.1

        if (i == 7) {           
            body.appendChild(div)
            div.appendChild(document.querySelector('.espElev'))
            div.appendChild(link)
            link.click()
        } else {
            body.appendChild(div)
            div.appendChild(link)
        }
    }
}
var musicaLigada =true
var idDamusica=0
var quantidadeDemusica=4

function munda(){
    let munda=document.querySelector('.Mmusica')
    if(munda.value=="a" && musicaLigada){
        idDamusica+=1
    }
    if (idDamusica==quantidadeDemusica) {
        idDamusica=0
    }
    let mundaImgMusi=document.querySelector('.seleçãoDeMusica')
    let broximaImg=document.querySelector('.boximaMusica')
    mundaImgMusi.style.background = `url(images/imgMusi${idDamusica}.png)`
    mundaImgMusi.style.backgroundSize = "100%"
    if (quantidadeDemusica==idDamusica+1) {
        broximaImg.style.background = `url(images/imgMusi0.png)`
        broximaImg.style.backgroundSize = "100%"
    }else{
        broximaImg.style.background = `url(images/imgMusi${idDamusica+1}.png)`
        broximaImg.style.backgroundSize = "100%"
    }

}

function musica(){
    let musi=document.querySelector('.Bmusica')
    let musica=document.querySelector('.musica'+idDamusica)
    if (musicaLigada && musi.value=="iniciaMusical"){
        musi.style.backgroundColor='green'
        musica.play()
        musi.loop=true
        musicaLigada=false
    }else if(!musicaLigada){
        musica.pause()
        musicaLigada=true
        musi.style.backgroundColor='red'
    }
}


var cetaDosbutos=true
function aparecer(){
    let butãoDoElevador=document.querySelector('.butaoDoElevador')
    let ceta=document.querySelector('.ceta')
    if(ceta.value=="apareceu" && cetaDosbutos){
        butãoDoElevador.classList.remove('butaoDoElevador1')
        butãoDoElevador.classList.add('butaoDoElevador2')
        cetaDosbutos=false
    }else if(ceta.value=="apareceu" && !cetaDosbutos){
        butãoDoElevador.classList.remove('butaoDoElevador2')
        butãoDoElevador.classList.add('butaoDoElevador1')
        cetaDosbutos=true
    }
}