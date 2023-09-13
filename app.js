const cvs2 = document.getElementById('frogger-canvas')
const ctx2 = cvs2.getContext('2d')

const CANWIDTH = cvs2.width = 800
const CANHEIGHT = cvs2.height = 600

const img1 = new Image()
img1.src = 'assets/26755.png'
const img2 = new Image()
img2.src = 'assets/frogger.png'


let frogLocation = {
    x: 400,
    y: 580
}

let scale2 = 1

let anim2 = 0
let frame = 0
let px = 0


const frogX = 54 
const frogY = 152
const frogWidth = 94 - frogX
const frogHeight = 182 - frogY

const frogAspectRatio = frogHeight / frogWidth

const frogShowWidth = 20 / frogAspectRatio
const frogShowHeight = 20

const carX = 408
const carY = 175
const carWidth = 490 - carX
const carHeight = 220 - carY

const carAspectRatio = carHeight / carWidth
const carShowWidth = 40 / carAspectRatio
const carShowHeight = 40

const spacing = Math.floor((CANWIDTH - 2 * carShowWidth) / 2)

const speed = 1

let row1 = []
for (let i = 0 ; i < 2 ; i++) {
    row1[i] = {x: i * spacing + i * carShowWidth, y: 580 - carShowHeight}
}

let row2 = []
for (let i = 0 ; i < 2 ; i++) {
    row2[i] = {x: i * spacing + (i + 1) * carShowWidth, y: 580 - carShowHeight}
}

let car1 = {
    x: 800 - carShowWidth,
    y: 580 - carShowHeight,
    speed: 1
}

let car1Shadow = {
    x: car1.x + CANWIDTH,
    y: car1.y
}

let car2 = {
    x: carShowWidth,
    y: 580 - carShowHeight,
    speed: 1
}


function animate2() {
    //car1.x = car1.x - car1.speed
    //car1Shadow.x = car1Shadow.x - car1.speed
    //car2.x = car2.x + car2.speed
    ctx2.clearRect(0, 0, CANWIDTH, CANHEIGHT)
    
    let column = frame % 3
    ctx2.drawImage(img2, frogX, frogY, frogWidth, frogHeight, frogLocation.x, frogLocation.y, frogShowWidth, frogShowHeight)
    //ctx2.drawImage(img1, carX, carY, carWidth, carHeight, car1.x, car1.y, carShowWidth, carShowHeight)
    //ctx2.drawImage(img1, carX, carY, carWidth, carHeight, car1Shadow.x, car1Shadow.y, carShowWidth, carShowHeight)
    row1.forEach( car => ctx2.drawImage(img1, carX, carY, carWidth, carHeight, car.x, car.y, carShowWidth, carShowHeight))
    
    
    /*if (car1.x < -carShowWidth) {
        car1.x = car1Shadow.x + CANWIDTH
    }
    else if (car1Shadow.x < -carShowWidth) {
        car1Shadow.x = car1.x + CANWIDTH
    }*/
    ctx2.save()

    ctx2.rotate(Math.PI)
    //ctx2.drawImage(img1, carX, carY, carWidth, carHeight, -car2.x, -car2.y, carShowWidth, carShowHeight)
    row2.forEach( car => ctx2.drawImage(img1, carX, carY, carWidth, carHeight, -car.x, -car.y, carShowWidth, carShowHeight))
    ctx2.restore()

    row1 = row1.map(car => {
        return {
            x: car.x - speed < -carShowWidth ? CANWIDTH : car.x - speed, 
            y: car.y
        }
    })
    row2 = row2.map(car => {
        return {
            x: car.x + speed - carShowWidth > CANWIDTH ? 0 : car.x + speed, 
            y: car.y
        }
    })
    requestAnimationFrame(animate2)
    
}

animate2()
