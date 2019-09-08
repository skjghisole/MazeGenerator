function setup() {
	let canvas = createCanvas(window.screen.width, window.screen.height)
	canvas.parent('root')
	// background(102);
}

function draw() {
	if (mouseIsPressed) {
		stroke(0)
		line(mouseX, mouseY, pmouseX, pmouseY)
	}
}