let cols = 15
let rows = 15
let w, h
let grid, cellGrid
let current
let stack = []
let revisitStack = []
let startDraw = false;

document.getElementById('start-btn').addEventListener('click', function() {
	startDraw = true
})

document.getElementById('reset-btn').addEventListener('click', function() {
	current = undefined
	stack = []
	revisitStack = []
	startDraw = false
	setup()
})

document.getElementById('set-random-start-btn').addEventListener('click', function() {
	console.log('clicked')
	if (startDraw == false && cellGrid.length > 0) {
		current = cellGrid[generateRandomNumber(rows - 1)][generateRandomNumber(cols - 1)]
		setup()
	}
})

function generateRandomNumber(x = 10) {
	return Math.floor(Math.random() * x) + 1
}

function generateCellGrid(grid) {
	let cellGrid = Object.assign([], grid)
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			cellGrid[i][j] = new Cell(i, j)
			// cellGrid[i][j].randomizeWalls()
		}
	}
	return cellGrid
}

function generateGrid(x, y) {
	let grid = new Array(x)
	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(y)
	}
	return grid
}


function setup() {
	let canvas = createCanvas(window.screen.width, window.screen.height)
	canvas.parent('root')
	// frameRate(5)

	w = Math.floor(width / rows)
	h = Math.floor(height / cols)

	grid = generateGrid(rows, cols)
	cellGrid = generateCellGrid(grid)
	if (!current) {
		current = cellGrid[0][0]
	}
	current.visited = true
	revisitStack.push(current)

	for (let i = 0; i < cellGrid.length; i++) {
		for (let j = 0; j < cellGrid[i].length; j++) {
			cellGrid[i][j].show()
		}
	}
	current.highlight(color(0, 255, 0))
}

function draw() {
	background(0)
	current.highlight(color(0, 255, 0))
	if (!startDraw) {
		return
	}
	for (let i = 0; i < cellGrid.length; i++) {
		for (let j = 0; j < cellGrid[i].length; j++) {
			cellGrid[i][j].show()
		}
	}
	current.highlight(color(0, 255, 0))
	const neighbor = current.checkNeighbors(cellGrid)
	if (neighbor) {
		//step 2
		stack.push(current)
		neighbor.removeWall(current)
		neighbor.visited = true
		revisitStack.push(neighbor)
		current = neighbor
	} else if (stack.length > 0) {
		const popped = stack.pop()
		revisitStack.push(popped)
		popped.revisited = true
		current = popped
	} else if (revisitStack.length > 0) {
		const popped = revisitStack.pop()
		popped.revisited = true
		current = popped
	} else {
		alert('Maze Finished')
		noLoop()
	}

}




