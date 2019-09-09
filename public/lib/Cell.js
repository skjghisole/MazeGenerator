function Cell(i, j) {
	this.i = i
	this.j = j
	this.walls = [true, true, true, true]
	this.visited = false
	this.revisited = false
}

Cell.prototype.randomizeWalls = function () {
	const { waslls } = this
	for (let i = 0; i < walls.length; i++) {
		this.walls[i] = (generateRandomNumber() < 5)
	}
}

Cell.prototype.removeWall = function(current) {
	const { i, j, walls } = this
	const diffI = i - current.i
	const diffJ = j - current.j
	if (diffI > 0 && diffJ == 0) {
		current.walls[1] = false
		walls[3] = false
	}
	if (diffI < 0 && diffJ == 0) {
		current.walls[3] = false
		walls[1] = false
	}

	if (diffJ < 0 && diffI == 0) {
		current.walls[0] = false
		walls[2] = false
	}
	if (diffJ > 0 && diffI == 0) {
		current.walls[2] = false
		walls[0] = false
	}
}

Cell.prototype.show = function () {
	const { i, j, walls, visited, revisited } = this
	const x = i * w
	const y = j * h
	const [top, right, bottom, left] = walls
	stroke(0)
	if (top) line(x		, y		 , x + w, y		 ) //top
	if (right) line(x + w, y		 , x + w, y + h) //right
	if (bottom) line(x    , y + h, x + w, y + h) //bottom
	if (left) line(x		, y		 , x		, y + h) //left
	// line(x, y, x+w,y)
	// line(x+w,y,x+w,y+h)
	// line(x+w,y+w,x,y+w)
	// line(x, y+w,x, y)
	// 
	if (revisited) {
		noStroke()
		fill(255, 0, 255)
		rect(x, y, w, h)
	}else if (visited) {
		noStroke()
		fill(255)
		rect(x, y, w, h)
	}
}

Cell.prototype.checkNeighbors = function(grid) {
	const { i, j } = this
	let validPoint = function([x, y], arr) {
		if (x < 0 || x > arr.length - 1) {
			return false
		}

		if (y < 0 || y > arr[0].length - 1) {
			return false
		}
		return arr[x][y]
	}


	const neighbors = [
		validPoint([i    , j - 1], grid),
		validPoint([i + 1, j    ], grid),
		validPoint([i    , j + 1], grid),
		validPoint([i - 1, j    ], grid)
	]
	const notVisitedNeighbors = neighbors.filter(x => x && !x.visited)
	const randomNeighbor = notVisitedNeighbors.length > 0 && notVisitedNeighbors[Math.floor(Math.random() * notVisitedNeighbors.length)]
	return randomNeighbor
}

Cell.prototype.highlight = function (color) {
	const { i, j } = this
	const x = i * w
	const y = j * h
	noStroke()
	fill(color)
	rect(x, y, w, h)
}

