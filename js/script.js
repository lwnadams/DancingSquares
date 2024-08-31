

class Player{
    //Constructor template for each player and their controlled positional directions
    constructor(color, up, down, left, right, position){
    this.color = color,
    this.up = up,
    this.down = down,
    this.left = left,
    this.right = right,
    this.position = position
}

    //method to take old position and generate new position based on controller attributes
    getNewPosition(){
        //Below looks at different scenarios; What if the player is pressing conflicting keys. these scenarios are looked at
        if (this.up === true && this.down === true && this.left === true && this.right === true){
            return this.position
        } else if ((this.up === true && this.down === true) || (this.up === false && this.down === false)){
            if (this.right === true && this.left === false){
                return [this.position[0]+speed, this.position[1]]
            } else if (this.left === true && this.right === false){
                return [this.position[0]-speed, this.position[1]]
            } else {
                return this.position
            }
        } else if ((this.left === true && this.right === true) || (this.left === false && this.right === false)){
            if (this.down === true && this.up === false) {
                return [this.position[0], this.position[1]+speed]
            } else if (this.up === true && this.down === false){
                return [this.position[0], this.position[1]-speed]
            } else {
                return this.position
            }
        //Section below to account for diaganol movements
        } else if (this.up === true && this.right === true) {
            return [this.position[0]+speed,this.position[1]-speed]
        } else if (this.up === true && this.left === true) {
            return [this.position[0]-speed,this.position[1]-speed]
        } else if (this.down === true && this.left === true) {
            return [this.position[0]-speed,this.position[1]+speed]
        } else if (this.down === true && this.right === true) {
            return [this.position[0]+speed,this.position[1]+speed]
        } else {
            return this.position //Just incase there's any key combination not accounted for, to ensure bug free, if the computer can't map the combination, the function returns the original position
        }
    } 
}


function boundary_checker(x, y){ //Ensures new positions stay within boundarys. This could be a much more complex function to account for complex boundaries/maze type systems or even players crashing into each other.
    if (x > canvas.width-size){
        x = canvas.width-size
    } else if (x < 0) {
            x = 0
    } 
    if (y > canvas.height-size){
        y = canvas.height-size
    } else if (y < 0) {
            y = 0
    }
    return [x, y]
} 


function move(player, position){ //Requests new position, verifies its within the boundary, then draws new position and returns the new position
    newPosition = player.getNewPosition()
    newPosition = boundary_checker(newPosition[0], newPosition[1])
    draw(player.color, position, newPosition)
    return newPosition
}



function draw(color, position, positionNew){ //Draws thw new position. Needs the old position so ctx can clear the canvas in the correct place
    ctx.clearRect(position[0], position[1], size, size)
    ctx.fillStyle = color
    console.log(color)
    ctx.fillRect(positionNew[0], positionNew[1], size, size);
}



document.addEventListener("keydown", (e) => { //Changes player controlled directions based on controller keys being pressed
    if (e.key === "ArrowUp"){
      white.up = true
    } else if (e.key === "ArrowDown"){
        white.down = true
    } else if (e.key === "ArrowLeft"){
        white.left = true
    } else if (e.key === "ArrowRight"){
        white.right = true
    } else if (e.key === "w"){
        black.up = true
    } else if (e.key === "s"){
        black.down = true
    } else if (e.key === "a"){
        black.left = true
    } else if (e.key === "d"){
        black.right = true
    }
}
)

document.addEventListener("keyup", (e) => { //Changes player controlled directions based on controller keys being unpressed
    if (e.key === "ArrowUp"){
        white.up = false
    } else if (e.key === "ArrowDown"){
        white.down = false
    } else if (e.key === "ArrowLeft"){
        white.left = false
    } else if (e.key === "ArrowRight"){
        white.right = false
    } else if (e.key === "w"){
        black.up = false
    } else if (e.key === "s"){
        black.down = false
    } else if (e.key === "a"){
        black.left = false
    } else if (e.key === "d"){
        black.right = false
    }
}
)


const canvas = document.querySelector("#play-game-container");
const ctx = canvas.getContext("2d");

//Settings, allows players to change speed (by movement frames per animation) and block size
const speed = 5;
const size = 30;

//Creating the 2 apponents for the Player constructor. The player constructor could be used for many blocks not just 2
let black = new Player("black", false, false, false, false, [0, canvas.height-size]);
let white = new Player("white", false, false, false, false, [canvas.width-size, canvas.height-size]);


//Uses the draw function just for the intiial set up
draw(white.color, white.position, white.position)
draw(black.color, black.position, black.position)

//Animate loop used from online source
const animate = () => {

    black.position = move(black, black.position)
    white.position = move(white, white.position)

    window.requestAnimationFrame(animate)
  }

window.requestAnimationFrame(animate)
