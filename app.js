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

const car1X = 408
const car1Y = 175
const car1Width = 490 - car1X
const car1Height = 220 - car1Y

const car1AspectRatio = car1Height / car1Width
const car1ShowWidth = 40 / car1AspectRatio
const car1ShowHeight = 40

const spacing1 = Math.floor((CANWIDTH - 2 * car1ShowWidth) / 2)

const speed1 = 1

const car2X = 440
const car2Y = 65
const car2Width = 529 - car2X
const car2Height = 107 - car2Y

const car2AspectRatio = car2Height / car2Width
const car2ShowWidth = 40 / car2AspectRatio
const car2ShowHeight = 40

const spacing2 = Math.floor((CANWIDTH - 2 * car2ShowWidth) / 2)

const speed2 = 1.5

let row1 = []
for (let i = 0 ; i < 2 ; i++) {
    row1[i] = {x: CANWIDTH - (i * spacing1 + (i + 1) * car1ShowWidth), y: 580 - car1ShowHeight}
}

let row2 = []
for (let i = 0 ; i < 2 ; i++) {
    row2[i] = {x: CANWIDTH - (i * spacing1 + (i + 1) * car1ShowWidth), y: 20 + car1ShowHeight}
}

let row3 = []
for (let i = 0 ; i < 2 ; i++) {
    row3[i] = {x: i * spacing2 + i * car2ShowWidth, y: 500 - car2ShowHeight}
}

let row4 = []
for (let i = 0 ; i < 2 ; i++) {
    row4[i] = {x: i * spacing2 + (i + 1) * car2ShowWidth, y: 500 - car2ShowHeight}
}


let car1 = {
    x: CANWIDTH - car1ShowWidth,
    y: CANHEIGHT - 20 - car1ShowHeight,
    speed: 1
}

let car1Shadow = {
    x: car1.x + CANWIDTH,
    y: car1.y
}

let car2 = {
    x: CANWIDTH - car1ShowWidth,
    y: car1ShowHeight + 20
}


function animate2() {
    ctx2.clearRect(0, 0, CANWIDTH, CANHEIGHT)
    
    let column = frame % 3
    ctx2.drawImage(img2, frogX, frogY, frogWidth, frogHeight, frogLocation.x, frogLocation.y, frogShowWidth, frogShowHeight)
    row1.forEach( car => ctx2.drawImage(img1, car1X, car1Y, car1Width, car1Height, car.x, car.y, car1ShowWidth, car1ShowHeight))
    
    ctx2.save()
    
    ctx2.rotate(Math.PI)
    ctx2.translate(-CANWIDTH, -CANHEIGHT)
    row2.forEach( car => ctx2.drawImage(img1, car1X, car1Y, car1Width, car1Height, car.x, car.y, car1ShowWidth, car1ShowHeight))
    ctx2.restore()

    row1 = row1.map((car) => checkAndReset(car, speed1, car1ShowWidth))
    row2 = row2.map((car) => checkAndReset(car, speed1, car1ShowWidth))

    // row3.forEach( car => ctx2.drawImage(img1, car2X, car2Y, car2Width, car2Height, car.x, car.y, car2ShowWidth, car2ShowHeight))
    //     ctx2.save()

    // ctx2.rotate(Math.PI)
    // ctx2.translate(-CANWIDTH, -CANHEIGHT)
    // row4.forEach( car => ctx2.drawImage(img1, car2X, car2Y, car2Width, car2Height, -car.x, -car.y, car2ShowWidth, car2ShowHeight))
    // ctx2.restore()

    // row3 = row3.map(car => {
    //     return {
    //         x: car.x - speed2 < -car2ShowWidth ? CANWIDTH : car.x - speed2, 
    //         y: car.y
    //     }
    // })
    // row4 = row4.map(car => {
    //     return {
    //         x: car.x + speed2 - car2ShowWidth > CANWIDTH ? 0 : car.x + speed2, 
    //         y: car.y
    //     }
    // })

    requestAnimationFrame(animate2)
    
}

function checkAndReset(vehicle, speed, showWidth) {
    return {
        x: vehicle.x - speed < -showWidth ? CANWIDTH : vehicle.x - speed,
        y: vehicle.y
    }
}

animate2()

function animate3() {
    //car1.x = car1.x - car1.speed
    //car1Shadow.x = car1Shadow.x - car1.speed
    //car2.x = car2.x + car2.speed
    ctx2.clearRect(0, 0, CANWIDTH, CANHEIGHT)
    car1.x -= speed1
    if (car1.x < -car1ShowWidth) {
        car1.x = CANWIDTH
    }
    let column = frame % 3
    ctx2.drawImage(img2, frogX, frogY, frogWidth, frogHeight, frogLocation.x, frogLocation.y, frogShowWidth, frogShowHeight)
    ctx2.drawImage(img1, car1X, car1Y, car1Width, car1Height, car1.x, car1.y, car1ShowWidth, car1ShowHeight)
    ctx2.save()
    ctx2.rotate(Math.PI)
    ctx2.translate(-CANWIDTH, -CANHEIGHT)
    ctx2.drawImage(img1, car1X, car1Y, car1Width, car1Height, car2.x, car2.y, car1ShowWidth, car1ShowHeight)
    ctx2.restore()
    requestAnimationFrame(animate3)
}

//animate3()