
// let board=[
// [' ',' ',' '],
// [' ',' ',' '],
// [' ',' ',' ']
// ];
// ///console.log(board);

// const printBoard=board=>{
// 	console.log('Current Board:');
// 	for(var i=0;i<board.length;i++){
// 	console.log(board[i].join('|'));
// }
// };
// printBoard(board);
// board[0][1]='1';
// board[2][2]='B';
// printBoard(board)
// const generatelayerBoard=(numberOfRows,numberOfColumns)=>{
// 	const board=[];

// 	for(let rowIndex=0;rowIndex<numberOfRows;rowIndex++){
// 		const row=[];
// 		for(let columnIndex=0;columnIndex<numberOfColumns;columnIndex++){
// 			row.push(' ');
// 		}
// 		board.push(row);
// 	}
// 	return board;
// };
// //console.log(generatelayerBoard(3,4));
// const generateBombBoard=(numberOfRows,numberOfColumns,numberOfBombs)=>{
// 	const board=[];

// 	for(let rowIndex=0;rowIndex<numberOfRows;rowIndex++){
// 		const row=[];
// 		for(let columnIndex;columnIndex<numberOfColumns;columnIndex++){
// 			row.push(null);
// 		}
// 		board.push(row);
// 	}

// 	let numberOfBombsPlaced=0;

// 	while(numberOfBombsPlaced<numberOfBombs){
// 		const randomRowIndex=Math.floor(Math.random()*numberOfRows);
// 		const randomColumnIndex=Math.floor(Math.random()*numberOfColumns);
// 		if(board[randomRowIndex][randomColumnIndex]!='B'){
// 		board[randomRowIndex][randomColumnIndex]='B';
// 		numberOfBombsPlaced++;
// 	}
// 	}

// 	return board;
// };

// //console.log(generateBombBoard(3,4,3));

// const getNumberOfNeighborBombs=(bombBoard,rowIndex,columnIndex)=>{
// 	const neighborOffsets=[
// 	[-1,-1],
// 	[-1,0],
// 	[-1,1],
// 	[0,-1],
// 	[0,1]
// 	[1,-1],
// 	[1,0],
// 	[1,1]];

// const numberOfRows=bombBoard.length;
// const numberOfColumns=bombBoard[0].length;

// let numberOfBombs=0;


// neighborOffsets.forEach(offset =>{
// 	const neighborRowIndex=rowIndex+offset[0];
// 	const neighborColumnIndex=columnIndex+offset[1];
// 	if(neighborRowIndex>=0 && neighborRowIndex<numberOfRows && 
// 		neighborColumnIndex>=0 && neighborColumnIndex<numberOfColumns){
// 		if(bombBoard[neighborRowIndex][neighborColumnIndex]==='B'){
// 			numberOfBombs++;
// 		}
// 	}
// });
// return numberOfBombs;
// }

// const flipTile=(playerBoard,bombBoard,rowIndex,columnIndex)=>{
// 	if(playerBoard[rowIndex][columnIndex]!==' '){
// 		console.log('Already flipped that tile!');
// 		return;
// 	}
// 	else if(bombBoard[rowIndex][columnIndex]==='B'){
// 		playerBoard[rowIndex][columnIndex]='B';
// 	}
// 	else{
// 		playerBoard[rowIndex][columnIndex]=getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex);
// 	}
// };
// const printBoard=board=>{
// 	console.log(board.map(row => row.join(' | ')).join('\n'));
// };

// let playerBoard=generatelayerBoard(3,3);
// let bombBoard=generateBombBoard(3,2,2);
// //console.log('Player Board');
// printBoard(playerBoard);
// //console.log('Bomb Board');
// printBoard(bombBoard);
// flipTile(playerBoard,bombBoard,0,0);
// printBoard(playerBoard);



class Game{
	constructor(numberOfRows,numberOfColumns,numberOfBombs){
		this._board=new Board(numberOfRows,numberOfColumns,numberOfBombs);
	}

	playMove(rowIndex,columnIndex){
		this._board.flipTile(rowIndex,columnIndex);
		if(this._board.playerBoard[rowIndex][columnIndex]==='B'){
			console.log('Game Over! Final Board:');
			this._board.print();
		}else if(!this._board.hasNonBombEmptySpaces()){
			console.log('Congratulations, you won!');
		}else{
			console.log('Current board:');
			this._board.print();
		}

	}
}

class Board{
	constructor(numberOfRows,numberOfColumns,numberOfBombs){
		this._numberOfBombs=numberOfBombs;
		this._numberOfEmptySpaces=numberOfRows*numberOfColumns;
		this._playerBoard=Board.generatePlayerBoard(numberOfRows,numberOfColumns);
		this._bombBoard=Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
	}

	get playerBoard(){
		return this._playerBoard;
	}

	flipTile(rowIndex,columnIndex){
		if(this._playerBoard[rowIndex][columnIndex]!=' '){
			return;
		}
		if(this._bombBoard[rowIndex][columnIndex]==='B'){
			this._playerBoard[rowIndex][columnIndex]='B';
		}else{
			this._playerBoard[rowIndex][columnIndex]=this.getNumberOfNeighborBombs(rowIndex,columnIndex);

		}
		this._numberOfEmptySpaces--;
	}

	getNumberOfNeighborBombs(rowIndex,columnIndex){
		const neighborOffsets=[
		[-1,-1],
		[-1,0],
		[-1,1],
		[0,-1],
		[0,1],
		[1,-1],
		[1,0],
		[1,1]];

		const numberOfRows=this._bombBoard.length;
		const numberOfColumns=this._bombBoard[0].length;

		let numberOfBombs=0;

		neighborOffsets.forEach(offset=>{
			const neighborRowIndex=rowIndex+offset[0];
			const neighborColumnIndex=columnIndex+offset[1];
			if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
		});
		return numberOfBombs;
	}

	hasNonBombEmptySpaces(){
		return this._numberOfEmptySpaces!==this._numberOfBombs;
	}

	print(){
		console.log(this._playerBoard.map(row=> row.join(' | ')).join('\n'));
	}

	static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }
}

const g = new Game(3, 3, 3);
g.playMove(0, 2);
