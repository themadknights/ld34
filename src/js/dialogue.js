export class Dialogue {
    constructor(state) {
        this.gameState = state;
        this.game = state.game;

        this.data = this.game.cache.getJSON('dialogues');
        this.position = new Phaser.Point(0, this.game.height - 100);

        this.background = this.game.add.image(this.position.x, this.position.y, 'hudDialogue');
        this.background.fixedToCamera = true;

        this.avatar = this.game.add.image(this.position.x + 10, this.position.y + 10, 'mageAvatar');
        this.avatar.fixedToCamera = true;

        this.message = this.game.add.bitmapText(this.position.x + 100, this.position.y + 20, 'carrier_command', 'blah blah blah blah blah blah', 16);
        this.message.fixedToCamera = true;

        this.continueMessage = this.game.add.bitmapText(this.game.width - 300, this.position.y + 85, 'carrier_command', 'Press Z to cast a \'continue\' spell', 7);
        this.continueMessage.fixedToCamera = true;

        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.zKey.onDown.add(function() {
            if (this.messages.length > 0) {
                this.nextMessage();
            }
        }, this);

        this.messages = [];
        this.toggleVisibility();
    }

    start(dialogueId) {
        this.game.paused = true;
        this.messages = this.data[this.gameState.levelId][dialogueId];
        this.currentMessage = 0;
        this.setCurrentMessage();
        this.toggleVisibility();
    }

    stop() {
        this.messages = [];
        this.game.paused = false;
        this.toggleVisibility();
    }

    nextMessage() {
        this.currentMessage += 1;
        if (this.currentMessage >= this.messages.length) {
            this.stop();
        } else {
            this.setCurrentMessage();
        }
    }

    setCurrentMessage() {
        let message = this.messages[this.currentMessage];
        this.setAvatar(message.avatar);
        this.setMessage(message.text);
    }

    toggleVisibility() {
        this.background.visible = !this.background.visible;
        this.avatar.visible = !this.avatar.visible;
        this.message.visible = !this.message.visible;
        this.continueMessage.visible = !this.continueMessage.visible;
    }

    setAvatar(avatarName) {
        this.avatar.loadTexture(`${avatarName}Avatar`);
    }

    setMessage(text) {
        this.message.text = text;
    }
}
