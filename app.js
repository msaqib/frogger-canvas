const cvs2 = document.getElementById('frogger-canvas')
const ctx2 = cvs2.getContext('2d')

const CANWIDTH = cvs2.width = 800
const CANHEIGHT = cvs2.height = 540

const img1 = new Image()
img1.src = 'assets/26755.png'
const img2 = new Image()
img2.src = 'assets/frogger.png'
const img3 = new Image()
img3.src = 'assets/logs.png'

let frogLocation = {
    x: 400,
    y: 520
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

const truckX = 8
const truckY = 230
const truckWidth = 97 - truckX
const truckHeight = 275 - truckY

const truckAspectRatio = truckHeight / truckWidth
const truckShowWidth = 40 / truckAspectRatio
const truckShowHeight = 40

const spacing3 = Math.floor((CANWIDTH - 2 * truckShowWidth) / 2)

const speed3 = 2

let row1 = []
for (let i = 0 ; i < 2 ; i++) {
    row1[i] = {x: CANWIDTH - (i * spacing1 + (i + 1) * car1ShowWidth), y: CANHEIGHT - 20 - car1ShowHeight}
}

let row2 = []
for (let i = 0 ; i < 2 ; i++) {
    row2[i] = {x: CANWIDTH - (i * spacing1 + (i + 1) * car1ShowWidth), y: 20 + car1ShowHeight}
}

let row3 = []
for (let i = 0 ; i < 2 ; i++) {
    row3[i] = {x: i * spacing2 + i * car2ShowWidth, y: CANHEIGHT - 20 - 2 * car1ShowHeight - car2ShowHeight}
}

let row4 = []
for (let i = 0 ; i < 2 ; i++) {
    row4[i] = {x: i * spacing2 + (i + 1) * car2ShowWidth, y: 20 + car2ShowHeight + 2*car1ShowHeight}
}

let row5 = []
for (let i = 0 ; i < 2 ; i++) {
    row5[i] = {x: i * spacing3 + i * truckShowWidth, y: CANHEIGHT - 20 - 2*car1ShowHeight - 2*car2ShowHeight - truckShowHeight}
}

let row6 = []
for (let i = 0 ; i < 2 ; i++) {
    row6[i] = {x: i * spacing3 + i * truckShowWidth, y: 20 + truckShowHeight + 2*car1ShowHeight + 2*car2ShowHeight}
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

const logX = 16
const logY = 258
const logWidth = 366 - 16
const logHeight = 314 - 258

const logAspectRatio = logHeight / logWidth
const logShowHeight = 40
const logShowWidth = logShowHeight / logAspectRatio

const logSpeed = 1

let logLocations = []

const logSpacing = Math.floor((CANWIDTH - 2*logShowWidth) / 2)

const stagger = 200

for (let i = 0 ; i < 3 ; i ++) {
    logLocations.push({x: i*stagger, y: 20 + i * 80})
    logLocations.push({x: logShowWidth + logSpacing + i*stagger, y: 20 + i * 80})
}

for (let i = 0 ; i < 3 ; i++) {
    logLocations.push({x: CANWIDTH - logShowWidth - i * stagger, y: 60 + i * 80}) 
    logLocations.push({x: CANWIDTH - 2*logShowWidth - logSpacing - i*stagger, y: 60 + i * 80})
}

document.addEventListener('keydown', handleKey)
function handleKey(e) {
    switch(e.key) {
    case 'ArrowRight':
        if (frogLocation.x < CANWIDTH - frogShowWidth) 
            frogLocation.x+=20
        break
    
    case 'ArrowLeft':
        if (frogLocation.x > 0)
            frogLocation.x-=20
        break
    case 'ArrowUp':
        if (frogLocation.y > 0) 
            frogLocation.y -= 20
        break

    case 'ArrowDown':
        if(frogLocation.y < CANHEIGHT - frogShowHeight)
            frogLocation.y += 20
        break
    }
}

function animate2() {
    ctx2.clearRect(0, 0, CANWIDTH, CANHEIGHT)
    
    logLocations.forEach(location => ctx2.drawImage(img3, logX, logY, logWidth, logHeight, location.x, location.y, logShowWidth, logShowHeight))

    logLocations = logLocations.map((location, index) => {
        
        let newLocation = location
        if (Math.floor(index/6) === 0) {
            if(isFrogOnLog(location)) {
                frogLocation.x += logSpeed
            }
            newLocation.x = newLocation.x + logSpeed > CANWIDTH ? -logShowWidth : newLocation.x + logSpeed
        }
        else {
            if(isFrogOnLog(location)) {
                frogLocation.x -= logSpeed
                //console.log(location.x, frogLocation.x, logSpeed)
            }
            newLocation.x = newLocation.x - logSpeed < -logShowWidth ? CANWIDTH : newLocation.x - logSpeed
        }
        return newLocation
    })
    ctx2.drawImage(img2, frogX, frogY, frogWidth, frogHeight, frogLocation.x, frogLocation.y, frogShowWidth, frogShowHeight)

    row1.forEach( car => ctx2.drawImage(img1, car1X, car1Y, car1Width, car1Height, car.x, car.y, car1ShowWidth, car1ShowHeight))
    
    ctx2.save()
    
    ctx2.rotate(Math.PI)
    ctx2.translate(-CANWIDTH, -CANHEIGHT)
    row2.forEach( car => ctx2.drawImage(img1, car1X, car1Y, car1Width, car1Height, car.x, car.y, car1ShowWidth, car1ShowHeight))
    ctx2.restore()

    row1 = row1.map((car) => incrementCheckAndReset(car, speed1, car1ShowWidth))
    row2 = row2.map((car) => incrementCheckAndReset(car, speed1, car1ShowWidth))

    row3.forEach( car => ctx2.drawImage(img1, car2X, car2Y, car2Width, car2Height, car.x, car.y, car2ShowWidth, car2ShowHeight))
    ctx2.save()

    ctx2.rotate(Math.PI)
    ctx2.translate(-CANWIDTH, -CANHEIGHT)
    row4.forEach( car => ctx2.drawImage(img1, car2X, car2Y, car2Width, car2Height, car.x, car.y, car2ShowWidth, car2ShowHeight))
    ctx2.restore()

    row3 = row3.map((car) => incrementCheckAndReset(car, speed2, car2ShowWidth))
    row4 = row4.map((car) => incrementCheckAndReset(car, speed2, car2ShowWidth))

    row5.forEach( truck => ctx2.drawImage(img1, truckX, truckY, truckWidth, truckHeight, truck.x, truck.y, truckShowWidth, truckShowHeight))
    ctx2.save()

    ctx2.rotate(Math.PI)
    ctx2.translate(-CANWIDTH, -CANHEIGHT)
    row6.forEach( truck => ctx2.drawImage(img1, truckX, truckY, truckWidth, truckHeight, truck.x, truck.y, truckShowWidth, truckShowHeight))
    ctx2.restore()

    row5 = row5.map((truck) => incrementCheckAndReset(truck, speed3, truckShowWidth))
    row6 = row6.map((truck) => incrementCheckAndReset(truck, speed3, truckShowWidth))

    if (isFrogDrowned()) 
        return
    if (isFrogWon())
        return
    if (row1.some((car) => isFrogHit(car, car1ShowWidth, car1ShowHeight)))
        return
    if (row2.some((car) => isFrogHit(convertCoord(car, car1ShowWidth, car1ShowHeight), car1ShowWidth, car1ShowHeight)))
        return
    if (row3.some((car) => isFrogHit(car, car2ShowWidth, car2ShowHeight)))
        return
    if (row4.some((car) => isFrogHit(convertCoord(car, car2ShowWidth, car2ShowHeight), car2ShowWidth, car2ShowHeight)))
        return
    if (row5.some((truck) => isFrogHit(truck, truckShowWidth, truckShowHeight)))
        return
    if (row6.some((truck) => isFrogHit(convertCoord(truck, truckShowWidth, truckShowHeight), truckShowWidth, truckShowHeight)))
        return
    requestAnimationFrame(animate2)
    
}

function incrementCheckAndReset(vehicle, speed, showWidth) {
    return {
        x: vehicle.x - speed < -showWidth ? CANWIDTH : vehicle.x - speed,
        y: vehicle.y
    }
}

function isFrogOnLog(logLocation) {
    if (
        (frogLocation.y + frogShowHeight <= logLocation.y + logShowHeight) && 
        (frogLocation.y >= logLocation.y) && 
        (frogLocation.x >= logLocation.x) &&
        (frogLocation.x <= logLocation.x + logShowWidth - frogShowWidth)
        ){
        return true
    }
        
    else {
        return false
    }
}

function isFrogDrowned() {
    if (frogLocation.y > 20 && frogLocation.y <= 240) {
        if (!logLocations.some(location => isFrogOnLog(location))) {
            return true
        }
    }
    else
        return false
}

function isFrogWon() {
    if (frogLocation.y < 20) {
        return true
    }
    else
        return false
}

function isFrogHit(vehicle, vehicleWidth, vehicleHeight) {
    if (frogLocation.y >= vehicle.y && 
        frogLocation.y + frogShowHeight <= vehicle.y + vehicleHeight &&
        frogLocation.x + frogShowWidth >= vehicle.x &&
        frogLocation.x <= vehicle.x + vehicleWidth
        )
        return true
        
    return false
}

function convertCoord(vehicle, vehicleWidth, vehicleHeight) {
    return {
        x: CANWIDTH - vehicle.x - vehicleWidth,
        y: CANHEIGHT - vehicle.y - vehicleHeight
    }
}

animate2()