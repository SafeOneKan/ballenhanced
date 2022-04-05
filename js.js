const box = document.querySelector(".wincheck")
const text = document.querySelector(".wol")
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const reset = document.querySelector("#reset")
const scoretext = document.querySelector(".score")

window.addEventListener("load",()=>{
    canvas.width = window.innerWidth * .6
    canvas.height = window.innerHeight*.8
    table.width = canvas.width*0.25
    
})
let speed = 1.5
let velocity = 10
let side = 1
plus = true
let score = 0
play = true

window.addEventListener("resize",()=>{
    canvas.width = innerWidth * .6
    canvas.height = innerHeight*.8
    
})


reset.addEventListener("click",()=>{
    play = true
    box.style.setProperty("display","none")

})

class Player{
    constructor({x,y}){
        this.position={
            x,y
        }
        this.radius = 15;
    }

    draw(){
        c.fillStyle = "red"
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI *2)
        c.fill()
        c.strokeStyle = "black"
        c.stroke()
    }
}


class Table{
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height    
    }

    frid(){
        c.fillStyle = "black"
        c.fillRect(this.x,this.y,this.width,this.height)
        c.stroke()
    }
}

const ball = new Player({x:canvas.width*.2,y:0})
window.addEventListener("mousemove",(e)=>{
  
    
    table.x = e.clientX + canvas.width - innerWidth*.8
})
window.addEventListener("touchmove",(e)=>{
    
         table.x = e.touches[0].clientX + canvas.width - innerWidth*.8
    
   
})

const table = new Table(0,canvas.height,canvas.width*.4,15)
animate()
window.addEventListener("keydown",(e)=>{
    if(e.key == "d" && table.x + table.width <= canvas.width){
        table.x += 50
    }
    else if (e.key == "q" && table.x  >= 0)
    {
        table.x -= 50
    }
})
function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)
    
    c.fillStyle = "white"
    c.fillRect(0,0,canvas.width,canvas.height)
    table.y = canvas.height*.9
    c.beginPath()
    if (play){
        ball.position.y += velocity
    velocity += speed*.20
    ball.draw()
    table.frid()
    ball.position.x += side
    }
    
    if(ball.position.y + ball.radius + velocity  >= table.y &&
        ball.position.x  >= table.x && ball.position.x <= table.x + table.width
        ){
           velocity = -velocity 
           let mine = plus? 6 : -6
           side += speed * Math.floor(-Math.random()*mine)
           score += 50
           plus = !plus
        }
    

    if(ball.position.y + velocity <= 0){
        velocity = -velocity
        
    }
    if(   ball.position.x +ball.radius >= canvas.width ||
        ball.position.x + side <= 2
        ){
            side = -side
            
    }
    if(ball.position.y + ball.radius + velocity >= canvas.height){
        velocity = 0
        side = 0
        c.clearRect(0,0,canvas.width,canvas.height)
        ball.position.y = 0;
        ball.position.x = Math.floor(Math.random()*450)
        score -= 60

    }
    scoretext.textContent = score
    if (score <= -60){
        ball.position.y = 0;
        ball.position.x = 150;
        score = 0
        play = false
        text.textContent = `U LOST THE GAME`
        box.style.setProperty("display","flex")
    }

   
}