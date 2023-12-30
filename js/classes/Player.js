class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop })
        this.position = {
            x: 200,
            y: 200
        };
        this.sides = {
            bottom: this.position.y + this.height
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
        //console.log(collisionBlocks);
    }

    update() {
        //c.fillStyle = 'rgba(0, 255, 0, 0.3)'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x;
        this.UpdateHitbox()
        this.HorizontalCollis()
        this.ApplyGravity()
        this.UpdateHitbox()

        //c.fillStyle = 'rgba(255, 0, 0, 0.3)'
        //c.fillRect(
        //    this.hitbox.position.x,
        //    this.hitbox.position.y, 
        //    this.hitbox.width, 
        //    this.hitbox.height
        //)
        this.VerticalCollis()
    }
    handleIn(keys) {
        if (player.preventIn) return
        this.velocity.x = 0
        if (keys.a.pressed) {
            this.changeSprite('runLeft')
            this.velocity.x = -5
            this.direction = 'left'
        }
        else if (keys.d.pressed) {
            this.changeSprite('runRight')
            this.velocity.x = 5
            this.direction = 'right'
        }
        else {
            if (this.direction === 'left') player.changeSprite('Left')
            else this.changeSprite('Right')
        }
    }
    changeSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }
    UpdateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 53,
        }
    }
    HorizontalCollis() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]; // Исправлено на "collisionBlock"
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }
    VerticalCollis() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
    ApplyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

}