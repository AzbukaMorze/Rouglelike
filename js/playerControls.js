function handleKeyPress(event) {
    if (player.preventIn) return;
    switch (event.code) {
        case 'KeyW':
        case 'Space':
                for (let i = 0; i < doors.length; i++) {
                const door = doors[i];
                if (
                    player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.y = 0;
                    player.velocity.x = 0;
                    player.preventIn = true;
                    player.changeSprite('enterDoor');
                    door.playAnimation();
                    return;
                }
            }
            if (player.velocity.y === 0){
                player.velocity.y = -15;
            } 

            break;
        case 'KeyD':
            keys.d.pressed = event.type === 'keydown';
            break;
        case 'KeyA':
            keys.a.pressed = event.type === 'keydown';
            break;
    }
}

window.addEventListener('keydown', handleKeyPress);
window.addEventListener('keyup', handleKeyPress);
