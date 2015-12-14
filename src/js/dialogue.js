export class Dialogue {
    constructor(state) {
        this.gameState = state;
        this.game = state.game;

        this.read = [];

        this.data = this.game.cache.getJSON('dialogues');
        this.position = new Phaser.Point(0, this.game.height - 100);

        this.hudElements = this.game.add.group();
        this.hudElements.fixedToCamera = true;

        this.background = this.game.add.image(this.position.x, this.position.y, 'hudDialogue');
        this.hudElements.add(this.background);

        this.avatar = this.game.add.image(this.position.x + 10, this.position.y + 10, 'mageAvatar');
        this.hudElements.add(this.avatar);

        this.message = this.game.add.bitmapText(this.position.x + 100, this.position.y + 20, 'carrier_command', 'blah blah blah blah blah blah', 16);
        this.hudElements.add(this.message);

        this.continueMessage = this.game.add.bitmapText(400, this.position.y + 90, 'carrier_command', '- Press Z to cast a \'continue\' spell -', 7);
        this.continueMessage.anchor.setTo(0.5);
        this.hudElements.add(this.continueMessage);

        this.zKey = this.game.input.keyboard.addKey(Phaser.KeyCode.Z);
        this.zKey.onDown.add(function() {
            if (this.messages.length > 0) {
                this.nextMessage();
            }
        }, this);

        this.messages = [];
        this.toggleVisibility();
    }

    start(dialogueId, condition) {
        this.read.push(dialogueId);
        this.game.paused = true;
        this.messages = this.data[this.gameState.levelId][dialogueId];
        if (condition) {
            if (this.read.indexOf(condition) !== -1) {
                this.messages = this.messages[condition];
            } else {
                this.messages = this.messages[`!${condition}`];
            }
        }
        this.currentMessage = 0;
        this.toggleVisibility();
        this.setCurrentMessage();
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
        this.setAvatar(message.avatar, message.position);
        this.setMessage(message.text, message.position);
    }

    toggleVisibility() {
        this.hudElements.visible = !this.hudElements.visible;
    }

    setAvatar(avatarName, position = "left") {
        this.avatar.loadTexture(`${avatarName}Avatar`);
        if (position === 'left') {
            this.avatar.position.x = 10;
        } else {
            this.avatar.position.x = this.game.width - 90;
        }
    }

    setMessage(text) {
        this.message.text = text;
    }
}
