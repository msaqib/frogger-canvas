const cvs2 = document.getElementById('frogger-canvas')
const ctx2 = cvs2.getContext('2d')

const CANWIDTH = cvs2.width = 800
const CANHEIGHT = cvs2.height = 600

const img1 = new Image()
img1.src = 'assets/26755.png'
const img2 = new Image()
img2.src = 'assets/frogger.png'

const spwidth2 = 170 - 75
const spheight2 = 200 - 46

const arrX = [75, 263, 455, 69, 261, 462]
const arrY = [46, 46, 46, 235, 235, 235]

let frogLocation = {
    x: 400,
    y: 580
}
let scale2 = 1

let anim2 = 0
let frame = 0
let px = 0

function animate2() {
    ctx2.clearRect(0, 0, CANWIDTH, CANHEIGHT)
    //ctx.fillRect(x, 50, 100, 100)
    //x++
    // Draw from the top left corner of the canvas
    
    const frogX = 54 
    const frogY = 152
    const frogWidth = 94 - frogX
    const frogHeight = 182 - frogY

    const frogAspectRatio = frogHeight / frogWidth

    const frogShowWidth = 20 / frogAspectRatio
    const frogShowHeight = 20

    let column = frame % 3
    ctx2.drawImage(img2, frogX, frogY, frogWidth, frogHeight, frogLocation.x, frogLocation.y, frogShowWidth, frogShowHeight)
    
    requestAnimationFrame(animate2)
    
}

animate2()