const canvas = document.querySelector('canvas')
c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 768

const player = new Player({
    imageSrc: './Assets/img/king/idle.png',
    frameRate: 11,
    animations: {
        Right: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './Assets/img/king/idle.png',
        },
        Left: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './Assets/img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './Assets/img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './Assets/img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './Assets/img/king/enterDoor.png',
            onComplete: () => {
                console.log("you did that")
                gsap.to(
                    overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if( level === 4) level = 1
                        levels[level].init()
                        player.changeSprite('Right')
                        player.preventIn = false
                        gsap.to(overlay, {opacity: 0})
                        console.log(level)
                    }
                }
                )
            },
        },
    }
})

let parsedCollisions
let CollisionBlocks
let background
let doors
let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisions_lvl_1.parse2D()
            CollisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = CollisionBlocks
            if(player.currentAnimation) player.currentAnimation.isActive = false
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './Assets/img/backgroundLevel1.png',
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: './Assets/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 15,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisions_lvl_2.parse2D()
            CollisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = CollisionBlocks
            player.position.x = 96
            player.position.y = 140
            if(player.currentAnimation) player.currentAnimation.isActive = false
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './Assets/img/backgroundLevel2.png',
            })

            doors = [
                new Sprite({
                    position: {
                        x: 772.0,
                        y: 336,
                    },
                    imageSrc: './Assets/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 15,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisions_lvl_3.parse2D()
            CollisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = CollisionBlocks
            player.position.x = 750
            player.position.y = 230
            if(player.currentAnimation) player.currentAnimation.isActive = false
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './Assets/img/backgroundLevel3.png',
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176.0,
                        y: 336,
                    },
                    imageSrc: './Assets/img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 15,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    }
}

//console.log(CollisionBlocks)

const keys = {
    w: {
        pressed: false
    },
    space: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const overlay = {
    opacity: 0
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()

    //CollisionBlocks.forEach(CollisionBlock => {
    //    CollisionBlock.draw()
    //})

    doors.forEach(door => {
        door.draw()
    })

    player.handleIn(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()

