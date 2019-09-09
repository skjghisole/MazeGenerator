let cols = 25
let rows = 25
let w, h
let grid, cellGrid
let current

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
	frameRate(5)

	w = Math.floor(width / rows)
	h = Math.floor(height / cols)

	grid = generateGrid(rows, cols)
	cellGrid = generateCellGrid(grid)

	current = cellGrid[0][0]
	current.visited = true
}

function draw() {
	// background(0)
	for (let i = 0; i < cellGrid.length; i++) {
		for (let j = 0; j < cellGrid[i].length; j++) {
			cellGrid[i][j].show()
		}
	}
	current.highlight()
	const neighbor = current.checkNeighbors(cellGrid)
	if (neighbor) {
		//step 2
		//
		
		
		neighbor.removeWall(current)
		neighbor.visited = true
		current = neighbor
	}

}




