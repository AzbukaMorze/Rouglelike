const canvas = document.querySelector('canvas')
canvas.width = 1024
canvas.height = 560

const c = canvas.getContext('2d')
const parsedCollisions = collisions_lvl_1.parse2D()
const CollisionBlocks = parsedCollisions.createObjectsFrom2D()
console.log(CollisionBlocks)

const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './Assets/img/backgroundLevel1.png',
})

const player = new Player({
    collisionBlocks: CollisionBlocks,
})
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

function animate() {
    window.requestAnimationFrame(animate)
    backgroundLevel1.draw()

    CollisionBlocks.forEach(CollisionBlock => {
        CollisionBlock.draw()
    })

    player.velocity.x = 0
    if (keys.a.pressed) player.velocity.x = -5
    else if (keys.d.pressed) player.velocity.x = 5

    player.draw()
    player.update()
}

animate()

