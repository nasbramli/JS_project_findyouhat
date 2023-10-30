const prompt = require('prompt-sync')({sigint: true})

const hat = '^'//hat to find
const hole='0'//the hole
const field = '1'//the field of play
const path = '*'//path it draws

class fields{
    constructor(field){
        this._field = field
        this._xaxis = 0
        this._yaxis = 0
        this.gameOver = false
        this.OutBound = false
        this.hatFound = false

        const generateField = prompt('Do you want to play?'+'\n'+'(y/n)')
        const answer = generateField.toLowerCase()

        if(answer === 'y'){
            const xAxis = prompt('X-axis length(Please enter a number):')
            const yAxis = prompt('Y-axis height(Please enter a number):')
            const lobang =  prompt('Number of holes?:')

            this._field = this.generate(xAxis, yAxis, lobang)

            console.log('Controls')

            this.gamePlay(this._field);
        }else{
            console.log('Maybe next time')
        }


    }

    print(){
        for (let i=0; i < this._field.length; i++){
            console.log(this._field[i].join(''));
        }
    }

    generate(height, length, noOfHoles){
        let newField = []
        let fieldElements = []
        const holeNumber = noOfHoles;
        for(let i=0; i<length; i++){
            for(let j=0; j<height; j++){
              if( i === 0 && j === 0){
                fieldElements.push(path)
              }else{
                fieldElements.push(field)
              }
            }
            newField.push(fieldElements)
            fieldElements =[]
        }
        let holes = []
        while(holes.length < holeNumber){
            let randomLength = Math.floor(Math.random()*length)
            let randomHeight = Math.floor(Math.random()*height)
            if(randomLength !==0 || randomHeight !==0){
                if(newField[randomLength][randomHeight] !== hole){
                    newField[randomLength][randomHeight] = hole
                    holes.push([randomLength,randomHeight])
                }
            }
        }
        let hatSeek = false

        while (hatSeek == false){
            let x = Math.floor(Math.random()*length)
            let y = Math.floor(Math.random()*height)
            if(x!== 0 && y!==0){
                if(newField[x][y]!==hole){
                    newField[x][y] = hat;
                    hatSeek = true;
                }
            }
        }
        return newField
    }

    userMove(){
        const direction = prompt('Your move: ')

        if(direction ==='d'){
            this._xaxis +=1;
        }else if(direction ==='s'){
            this._xaxis -=1;
        }else if(direction ==='e'){
            this._yaxis -=1
        }else if(direction ==='x'){
            this._yaxis +=1
        }else{
            console.log('Invalid. try again')
            this.userMove()
        }
        if(
            this._yaxis<0 ||
            this._yaxis> this._field.length-1 ||
            this._xaxis> this._field[0].length-1
        ){
            this.outBounds = true
        }else{
            if(this._field[this._yaxis][this._xaxis]==='0'){
                this.gameOver = true
            }else if(this._field[this._yaxis][this._xaxis]==='^'){
                this.hatFound = true
            }else{
                this._field[this._yaxis][this._xaxis] = '*'
            }
        }
    }

    gamePlay(){
        this.print(this._field)
        this.userMove()
        while(
            this._xaxis >= 0&&
            this._yaxis >= 0&&
            this._yaxis < this._field.length &&
            this._xaxis < this._field[0].length &&
            this.gameOver === false &&
            this.hatFound === false
        ){
            this.print()
            this.userMove()
        }
        if(this.hatFound === true){
            console.log('Hat found! Congrats')
        }else if(this.outBounds === true){
            console.log('Out of bounds')
        }else if(this.gameOver === true){
            console.log('You landed in a hole!')
        }/*else{
            console.log('Game Over')
        }*/
    }
}

const newField = new fields();