# Phaser + Snowpack

> Just a POC with Phaser and Snowpack. This project was bootstrapped with Create Snowpack App (CSA).

To play, just [click here](https://phaser-snowpack.now.sh/) and have fun! :D

I've made maps with [Tiled](https://www.mapeditor.org/) and all assets are provided by [Pixel Frog](https://pixel-frog.itch.io/) that has a lot of free awesome game assets.

## How I do these interactions

I've tried to make the main scene map agnostic, so for every iteration, I create a new attribute on de tilemap to represent this iteration.

- Collides: boolean attribute called `collides`
- Jump through: bollean attribute called `jump-through`
- Player Spawn: an Object with name `player-spawn`
- Background: string attribute called `background` (every background inside `/public/assets/background`)

## Controlls

<kbd>Up</kbd> once for jump and twice for a double jump, you can do wall jump while you falling in the walls<br/>
<kbd>Left</kbd> to go left<br/>
<kbd>Right</kbd> to go right

## Features

- [X] Double jump
- [X] Wall jump
- [X] Jump through platforms
- [X] Loader screen
- [X] Scale screen
- [X] Camera following player
- [ ] Menu
- [ ] Char selection
- [ ] Virtual control (on mobile)
- [ ] Enemy
- [ ] Kill
- [ ] Death
- [ ] Reset
