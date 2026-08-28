function movement (character: game.LedSprite, angle: number) {
    character.turn(Direction.Right, angle)
    character.move(1)
    character.turn(Direction.Left, angle)
}
input.onButtonPressed(Button.A, function () {
    if (input.isGesture(Gesture.TiltLeft)) {
        movement(C1, 225)
    } else if (input.isGesture(Gesture.TiltRight)) {
        movement(C1, 315)
    } else {
        movement(C1, 270)
    }
    gameover()
    counter_reset = 0
})
input.onGesture(Gesture.TiltLeft, function () {
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
})
input.onButtonPressed(Button.AB, function () {
    counter_reset = counter_reset + 1
    if (counter_reset >= 4) {
        control.reset()
    }
})
input.onButtonPressed(Button.B, function () {
    if (input.isGesture(Gesture.TiltLeft)) {
        movement(C1, 45)
    } else if (input.isGesture(Gesture.TiltRight)) {
        movement(C1, 135)
    } else {
        movement(C1, 90)
    }
    gameover()
    counter_reset = 0
})
input.onGesture(Gesture.TiltRight, function () {
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
function gameover () {
    for (let value of array_monster) {
        if (C1.isTouching(value)) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            game.gameOver()
        }
    }
}
let ts_lastActive = 0
let counter_reset = 0
let array_monster: game.LedSprite[] = []
let C1: game.LedSprite = null
C1 = game.createSprite(2, 2)
array_monster = []
let C2 = game.createSprite(4, 0)
C2.turn(Direction.Left, 180)
array_monster.push(C2)
let C3 = game.createSprite(3, 4)
C3.turn(Direction.Left, 180)
array_monster.push(C3)
let C4 = game.createSprite(0, 0)
C4.turn(Direction.Left, 180)
array_monster.push(C4)
music.setVolume(94)
let loop_ms = 1000
counter_reset = 0
let myImage = images.createBigImage(`
    . # . . . . . . . #
    . . # . . . . . # .
    . . . # . . . # . .
    . . . . # . # . . .
    . . . . . # . . . .
    `)
basic.forever(function () {
    basic.pause(loop_ms)
    for (let value of array_monster) {
        value.move(1)
        if (value.get(LedSpriteProperty.X) == 0) {
            value.set(LedSpriteProperty.X, 5)
            value.set(LedSpriteProperty.Y, randint(0, 4))
        }
    }
    gameover()
    if (loop_ms > 200) {
        loop_ms = loop_ms - 20
        ts_lastActive = control.millis()
    } else {
        if (control.millis() - ts_lastActive > 30000) {
            game.pause()
            basic.showString("Nice")
            myImage.scrollImage(1, 200)
        }
    }
})
