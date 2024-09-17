// 1. Despoit 
// 2. Detetermine Number of Line to Bet 
// 2. Collect a Bet !
// 2. Spin the Slot Machine
// 2. Check if The User Won
// 2. Give The User Thier Wionning
// 2. Play Agnin


const prompt  = require('prompt-sync')();

const ROWS  = 3;
const COLS  = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B:4,
    C:6,
    D:8,
}
const SYMBOLS_VALUES = {
    A: 5,
    B:4,
    C:3,
    D:2,
}


// SYMBOLS_COUNT [A]



 const deposit = () =>{
    while(true){

        const depositAmount = prompt("Enter a deposit Amount: ")
        
        const numberDepositAmount = parseFloat(depositAmount)
        
        if (isNaN(numberDepositAmount)|| numberDepositAmount <= 0)
            {
                console.log("Invaild Deposit amount, try Again.");
            }else{
                return numberDepositAmount
            }
        }





 }


 const getNumberOfLine =  () =>{
    while(true){

        const line = prompt("Enter Number of Line to Bet on (1-3): ")
        
        const numberOfLines = parseFloat(line)
        
        if (isNaN(numberOfLines)|| numberOfLines <= 0 || numberOfLines  >3)
            {
                console.log("Invaild number of lines, try Again.");
            }else{
                return numberOfLines
            }
        }
 }

const getBet = (balance ,lines) =>{
    while(true){

        const bet = prompt("Enter total bet per line : ")
        
        const numberOfBet = parseFloat(bet)
        
        if (isNaN(numberOfBet)|| numberOfBet <= 0 || numberOfBet > (balance / lines))
            {
                console.log("Invaild bet, try Again.");
            }else{
                return numberOfBet
            }
        }
}

const spin = () => { 
    const symbols = []


    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT))
    {
      for (i = 0; i < count; i++){
        symbols.push(symbol )
      }
    }
    const reels  = []
    for (let i = 0; i< COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for (let j = 0; j< ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const SelectedSymbol = reelSymbols[randomIndex]
            reels[i].push(SelectedSymbol)
            reelSymbols.splice(randomIndex, 1)
        }

    }
    return reels
}

const transpose = (reels) => {
    const rows = []
    for (let i = 0; i< ROWS; i++ )
    {
        rows.push([])
        for(let j = 0; j< COLS; j++)
        {
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows)=>{
    for (const row of rows)
    {
        let rowString = ""
        for (const [i, symbol] of row.entries())
        {
            rowString += symbol 
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString);
        
    }
}
const getWinnings = (rows, bet , lines) => 
    {
        let Winnings = 0;

        for (let row =  0; row < lines; row ++)
        {
            const symbols = rows[row]
            let allSame = true
            for (const symbol of symbols)
            {
                if(symbol != symbols[0])
                {
                    allSame = false
                    break 

                }
            }
            if(allSame)
            {
                Winnings += bet * SYMBOLS_VALUES[symbols[0]]
            }
        }
        return Winnings
    }


const game = ()=>{

    
    let balance =  deposit();

    while (true){
        console.log("You Have a Balance of $" + balance);
        
        const numberOfLine =  getNumberOfLine();
        const bet =  getBet(balance, numberOfLine);
        balance -= bet * numberOfLine
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const Winnings = getWinnings(rows, bet ,numberOfLine)
        balance += Winnings
        console.log("You Won, $" + Winnings.toString());

        if(balance <= 0 ){
            console.log("You Ran out of Money!");
            break
        }
        const playAgain  = prompt("Do You Want to Play Again (y/n)?")

        if(playAgain != "y") break
    }
}

game()
