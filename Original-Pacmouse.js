const canvas = document.querySelector('canvas')
const scoreEl = document.querySelector('#scoreEl')
//c = context
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boundary {
    static width = 40
    static height = 40
    constructor({ position }){
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//Sprites
var spriteUp = new Image()
var spriteDown = new Image()
var spriteLeft = new Image()
var spriteRight = new Image()

var spriteUpR = new Image()
var spriteDownR = new Image()
var spriteLeftR = new Image()
var spriteRightR = new Image()

var spriteUpP = new Image()
var spriteDownP = new Image()
var spriteLeftP = new Image()
var spriteRightP = new Image()

var spriteUpO = new Image()
var spriteDownO = new Image()
var spriteLeftO = new Image()
var spriteRightO = new Image()

var spriteUpB = new Image()
var spriteDownB = new Image()
var spriteLeftB = new Image()
var spriteRightB = new Image()

//Pacmouse
spriteUp.src = 'images/Game Sprites/Player/Player-Up.png'
spriteDown.src = 'images/Game Sprites/Player/Player-Down.png'
spriteLeft.src = 'images/Game Sprites/Player/Player-Left.png'
spriteRight.src = 'images/Game Sprites/Player/Player-Right.png'

//Catghosts

spriteUpR.src = 'images/Game Sprites/Singleplayer/Singleplayer-Red-Up.png'
spriteDownR.src = 'images/Game Sprites/Singleplayer/Singleplayer-Red-Down.png'
spriteLeftR.src = 'images/Game Sprites/Singleplayer/Singleplayer-Red-Left.png'
spriteRightR.src = 'images/Game Sprites/Singleplayer/Singleplayer-Red-Right.png'

spriteUpP.src = 'images/Game Sprites/Singleplayer/Singleplayer-Pink-Up.png'
spriteDownP.src = 'images/Game Sprites/Singleplayer/Singleplayer-Pink-Down.png'
spriteLeftP.src = 'images/Game Sprites/Singleplayer/Singleplayer-Pink-Left.png'
spriteRightP.src = 'images/Game Sprites/Singleplayer/Singleplayer-Pink-Right.png'

spriteUpO.src = 'images/Game Sprites/Singleplayer/Singleplayer-Orange-Up.png'
spriteDownO.src = 'images/Game Sprites/Singleplayer/Singleplayer-Orange-Down.png'
spriteLeftO.src = 'images/Game Sprites/Singleplayer/Singleplayer-Orange-Left.png'
spriteRightO.src = 'images/Game Sprites/Singleplayer/Singleplayer-Orange-Right.png'

spriteUpB.src = 'images/Game Sprites/Singleplayer/Singleplayer-Blue-Up.png'
spriteDownB.src = 'images/Game Sprites/Singleplayer/Singleplayer-Blue-Down.png'
spriteLeftB.src = 'images/Game Sprites/Singleplayer/Singleplayer-Blue-Left.png'
spriteRightB.src = 'images/Game Sprites/Singleplayer/Singleplayer-Blue-Right.png'

class Player {
    constructor({position, velocity, direction}){
        this.position = position
        this.velocity = velocity
        this.direction = direction
        
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    draw() {
        let sprite = null
        switch (this.direction) {
            case 'up':
                sprite = spriteUp
                break;
            case 'down':
                sprite = spriteDown
                break;
            case 'left':
                sprite = spriteLeft
                break;
            case 'right':
                sprite = spriteRight
                break;
            default:
                sprite = spriteDown
                break;
        }
        c.drawImage(sprite, this.position.x, this.position.y, 38, 38)
    }
}

class Ghost {
    static speed = 2
    constructor({position, velocity, direction, id, catsprites}){
        this.position = position
        this.velocity = velocity
        this.direction = direction
        this.prevCollisions = []
        this.speed = 2
        this.id = id
        this.catsprites = catsprites
        this.scared = false
        
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    draw() {
        let sprite = null
        switch (this.direction) {
            case 'upR':
                sprite = spriteUpR
                break;
            case 'downR':
                sprite = spriteDownR
                break;
            case 'leftR':
                sprite = spriteLeftR
                break;
            case 'rightR':
                sprite = spriteRightR
                break;

            case 'upO':
                sprite = spriteUpO
                break;
            case 'downO':
                sprite = spriteDownO
                break;
            case 'leftO':
                sprite = spriteLeftR
                break;
            case 'rightO':
                sprite = spriteRightO
                break;

            case 'upB':
                sprite = spriteUpB
                break;
            case 'downB':
                sprite = spriteDownB
                break;
            case 'leftB':
                sprite = spriteLeftB
                break;
            case 'rightB':
                sprite = spriteRightB
                break;

            case 'upP':
                sprite = spriteUpP
                break;
            case 'downP':
                sprite = spriteDownP
                break;
            case 'leftP':
                sprite = spriteLeftP
                break;
            case 'rightP':
                sprite = spriteRightP
                break;
            default:
                sprite = spriteDownR
                break;
        }
        c.drawImage(sprite, this.position.x, this.position.y, 38, 38)
    }
}

class Pellet {
    constructor({position, image}){
        this.position = position
        this.image = image
        
    }

    draw() {
         c.drawImage(this.image, this.position.x, this.position.y, 38, 38)
    }
}

class PowerUp {
    constructor({position, image}){
        this.position = position
        this.image = image
        
    }

    draw() {
         c.drawImage(this.image, this.position.x, this.position.y, 38, 38)
    }
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''
let score = 0

//0 = Empty, 1 = Pellet, 2 = Wall, 3 = PowerUP, 4 = Spawn
const map = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
            [2,1,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,1,2],
            [2,4,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,4,2],
            [2,1,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,1,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,2,2,2,1,2,1,2,2,2,2,2,1,2,1,2,2,2,1,2],
            [2,1,2,2,2,1,2,1,2,2,2,2,2,1,2,1,2,2,2,1,2],
            [2,1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2],
            [2,2,2,2,2,1,2,2,2,0,2,0,2,2,2,1,2,2,2,2,2],
            [2,2,2,2,2,1,2,0,0,0,0,0,0,0,2,1,2,2,2,2,2],
            [2,2,2,2,2,1,2,0,2,2,3,2,2,0,2,1,2,2,2,2,2],
            [2,2,2,2,2,1,2,0,2,2,3,2,2,0,2,1,2,2,2,2,2],
            [3,3,3,3,2,1,0,0,2,3,3,3,2,0,0,1,2,3,3,3,3],
            [2,2,2,2,2,1,2,0,2,2,2,2,2,0,2,1,2,2,2,2,2],
            [2,2,2,2,2,1,2,0,0,0,0,0,0,0,2,1,2,2,2,2,2],
            [2,2,2,2,2,1,2,0,2,2,2,2,2,0,2,1,2,2,2,2,2],
            [2,2,2,2,2,1,2,0,2,2,2,2,2,0,2,1,2,2,2,2,2],
            [2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
            [2,1,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,1,2],
            [2,4,1,1,2,1,1,1,1,1,-1,1,1,1,1,1,2,1,1,4,2],
            [2,2,2,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,2,2,2],
            [2,2,2,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,2,2,2],
            [2,1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2],
            [2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]
const pellets = []
const boundaries = []
const powerUps = []
const catghosts = {
    0: [spriteUpR, spriteDownR, spriteLeftR, spriteRightR],
    1: [spriteUpO, spriteDownO, spriteLeftO, spriteRightO],
    2: [spriteUpB, spriteDownB, spriteLeftB, spriteRightB],
    3: [spriteUpP, spriteDownP, spriteLeftP, spriteLeftP]
}
const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + 1,
            y: Boundary.height + 1
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        direction: 'downR',
        id: 0,
        catsprite: catghosts[0]
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + 1,
            y: Boundary.height + 1
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        direction: 'downO',
        id: 1,
        catsprite: catghosts[1]
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + 1,
            y: Boundary.height + 1
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        direction: 'downB',
        id: 2,
        catsprite: catghosts[2]
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + 1,
            y: Boundary.height + 1
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        direction: 'downP',
        id: 3,
        catsprite: catghosts[3]
    }),
]

const player = new Player({
    position: {
        x: Boundary.width + 1,
        y: Boundary.height + 1
    },
    velocity: {
        x: 0,
        y: 0
    },
    direction: 'down'
})

function createImage(src) {
    const image = new Image()
    image.src = src
    return image
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case 2:
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                )
                break;
                case 1:
                pellets.push(
                    new Pellet({
                        position: {
                            x: Boundary.width * j + 1,
                            y: Boundary.height * i + 1
                        },
                        image: createImage('images/Game Sprites/Objects/Pellet.png')
                    })
                )
                break;
                case 4:
                powerUps.push(
                    new PowerUp({
                        position: {
                            x: Boundary.width * j + 1,
                            y: Boundary.height * i + 1
                        },
                        image: createImage('images/Game Sprites/Objects/PowerUp.png')
                    })
                )
                break;
        
            default:
                break;
        }
    })
})

function pacmouseCollidesWithWall({
    pacmouse,
    wall
}) {
    return(pacmouse.position.y + pacmouse.velocity.y <= wall.position.y + wall.height &&
        pacmouse.position.x + 38 + pacmouse.velocity.x >= wall.position.x &&
        pacmouse.position.y + 38 + pacmouse.velocity.y >= wall.position.y &&
        pacmouse.position.x + pacmouse.velocity.x <= wall.position.x + wall.width)
}

let animationId

function animate() {
    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    console.log(animationId)
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...player,
                        velocity: {
                        x: 0,
                        y: -5
                    }
                }, 
                wall: boundary
            })
           ){
            player.velocity.y = 0
            player.direction = 'up'
            break
           } else {
            player.velocity.y = -5
            player.direction = 'up'
           }
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...player,
                        velocity: {
                        x: -5,
                        y: 0
                    }
                }, 
                wall: boundary
            })
           ){
            player.velocity.x = 0
            player.direction = 'left'
            break
           } else {
            player.velocity.x = -5
            player.direction = 'left'
           }
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...player,
                        velocity: {
                        x: 0,
                        y: 5
                    }
                }, 
                wall: boundary
            })
           ){
            player.velocity.y = 0
            player.direction = 'down'
            break
           } else {
            player.velocity.y = 5
            player.direction = 'down'
           }
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...player,
                        velocity: {
                        x: 5,
                        y: 0
                    }
                }, 
                wall: boundary
            })
           ){
            player.velocity.x = 0
            player.direction = 'right'
            break
           } else {
            player.velocity.x = 5
            player.direction = 'right'
           }
        }
    }

    for (let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i]
    if (player.position.y <= ghost.position.y + 38 &&
        player.position.x + 38 >= ghost.position.x &&
        player.position.y + 38 >= ghost.position.y &&
        player.position.x <= ghost.position.x + 38) 
        {
            if(ghost.scared) {
                ghosts.splice(i, 1)
            }
            else {
            cancelAnimationFrame(animationId)
            console.log('GAME OVER')
            }
        }
    }

    if(pellets.length === 0)
    {
        console.log('Congrats! :3')
        cancelAnimationFrame(animationId)
    }
    for (let i = powerUps.length - 1; 0 <= i; i--) {
        const powerUp = powerUps[i]
        powerUp.draw()
        if (player.position.y <= powerUp.position.y &&
            player.position.x + 38 >= powerUp.position.x + 38 &&
            player.position.y + 38 >= powerUp.position.y + 38 &&
            player.position.x <= powerUp.position.x) {
            //console.log('touching')
            powerUps.splice(i, 1)
            score += 20
            scoreEl.innerHTML = score

            ghosts.forEach((ghost) => {
                ghost.scared = true
                //console.log(ghost.scared)

                setTimeout(() => {
                    ghost.scared = false
                    //console.log(ghost.scared)
                }, 5000)
            })
        }
    }
    for (let i = pellets.length - 1; 0 <= i; i--) {
        const pellet = pellets[i]

        pellet.draw()

        if (player.position.y <= pellet.position.y &&
            player.position.x + 38 >= pellet.position.x + 38 &&
            player.position.y + 38 >= pellet.position.y + 38 &&
            player.position.x <= pellet.position.x) {
            //console.log('touching')
            pellets.splice(i, 1)
            score += 10
            scoreEl.innerHTML = score
        }
    }
    //Good but not good enough lets make this more smooooooooth like butter xD
    /*pellets.forEach((pellet, i) => {
        pellet.draw()

        if (player.position.y <= pellet.position.y &&
            player.position.x + 38 >= pellet.position.x + 38 &&
            player.position.y + 38 >= pellet.position.y + 38 &&
            player.position.x <= pellet.position.x) {
            console.log('touching')
            pellets.splice(i, 1)
        }
    })*/

    boundaries.forEach((boundary) => {
        boundary.draw()
        
        if(
            pacmouseCollidesWithWall({
                pacmouse: player,
                wall: boundary
            })
           ){
            player.velocity.y = 0
            player.velocity.x = 0
           }
    })

    player.update()
    player.draw()

    ghosts.forEach((ghost) => {
        ghost.update()

        
            

        ghost.draw()

        const collisions = []
        boundaries.forEach(boundary => {
            if(
                !collisions.includes('right') &&
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...ghost,
                        velocity: {
                        x: ghost.speed,
                        y: 0
                    }
                }, 
                wall: boundary
            })
            ){
            collisions.push('right')
            if (ghost.id == 0)
                ghosts.direction = 'rightR'
            else if (ghost.id == 1)
                ghosts.direction = 'rightO'
            else if (ghost.id == 2)
                ghosts.direction = 'rightB'
            else if (ghost.id == 3)
                ghosts.direction = 'rightP'
            }
            if(
                !collisions.includes('left') &&
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...ghost,
                        velocity: {
                        x: -ghost.speed,
                        y: 0
                    }
                }, 
                wall: boundary
            })
            ){
             collisions.push('left')
             if (ghost.id == 0)
                ghosts.direction = 'leftR'
            else if (ghost.id == 1)
                ghosts.direction = 'leftO'
            else if (ghost.id == 2)
                ghosts.direction = 'leftB'
            else if (ghost.id == 3)
                ghosts.direction = 'leftP'
            }

            if(
                !collisions.includes('up') &&
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...ghost,
                        velocity: {
                        x: 0,
                        y: -ghost.speed
                    }
                }, 
                wall: boundary
            })
            ){
             collisions.push('up')
             if (ghost.id == 0)
                ghosts.direction = 'upR'
            else if (ghost.id == 1)
                ghosts.direction = 'upO'
            else if (ghost.id == 2)
                ghosts.direction = 'upB'
            else if (ghost.id == 3)
                ghosts.direction = 'upP'
            }

            if(
                !collisions.includes('down') &&
                pacmouseCollidesWithWall({
                    pacmouse: {
                        ...ghost,
                        velocity: {
                        x: 0,
                        y: ghost.speed
                    }
                }, 
                wall: boundary
            })
            ){
            collisions.push('down')
            if (ghost.id == 0)
                ghosts.direction = 'downR'
            else if (ghost.id == 1)
                ghosts.direction = 'downO'
            else if (ghost.id == 2)
                ghosts.direction = 'downB'
            else if (ghost.id == 3)
                ghosts.direction = 'downP'
            }
        })
        if (collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions
        }
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions))
        {
            //console.log('gogo')   
            console.log(collisions)
            console.log(ghost.prevCollisions)

            if (ghost.velocity.x > 0)
            ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0)
            ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0)
            ghost.prevCollisions.push('up') 
            else if (ghost.velocity.y > 0)
            ghost.prevCollisions.push('down')

            const pathways = ghost.prevCollisions.filter((collision) => {
                return !collisions.includes(collision)
            })
            console.log({pathways})
            const rnddirection = pathways[Math.floor(Math.random() * pathways.length)]
            console.log({rnddirection})

            switch (rnddirection) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    if (ghost.id == 0)
                        ghosts.direction = 'downR'
                    else if (ghost.id == 1)
                        ghosts.direction = 'downO'
                    else if (ghost.id == 2)
                        ghosts.direction = 'downB'
                    else if (ghost.id == 3)
                        ghosts.direction = 'downP'
                    break
                    case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    if (ghost.id == 0)
                        ghosts.direction = 'upR'
                    else if (ghost.id == 1)
                        ghosts.direction = 'upO'
                    else if (ghost.id == 2)
                        ghosts.direction = 'upB'
                    else if (ghost.id == 3)
                        ghosts.direction = 'upP'
                    break
                    case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    if (ghost.id == 0)
                        ghosts.direction = 'rightR'
                    else if (ghost.id == 1)
                        ghosts.direction = 'rightO'
                    else if (ghost.id == 2)
                        ghosts.direction = 'rightB'
                    else if (ghost.id == 3)
                        ghosts.direction = 'rightP'
                    break
                    case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
                    if (ghost.id == 0)
                        ghosts.direction = 'leftR'
                    else if (ghost.id == 1)
                        ghosts.direction = 'leftO'
                    else if (ghost.id == 2)
                        ghosts.direction = 'leftB'
                    else if (ghost.id == 3)
                        ghosts.direction = 'leftP'
                    break
            }

            ghost.prevCollisions = []
        }
        //console.log(collisions)
    })

    

    //player.velocity.y = 0
    //player.velocity.x = 0
}

animate()

addEventListener('keydown', ({key}) => {
switch (key) {
    case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        //player.direction = 'up'
        break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            //player.direction = 'left'
        break;
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            //player.direction = 'down'
        break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            //player.direction = 'right'
        break;

    default:
        break;
}
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            //player.direction = 'up'
            break;
            case 'a':
                keys.a.pressed = false
                //player.direction = 'left'
            break;
            case 's':
                keys.s.pressed = false
                //player.direction = 'down'
            break;
            case 'd':
                keys.d.pressed = false
                //player.direction = 'right'
            break;
    
        default:
            break;
    }
    })