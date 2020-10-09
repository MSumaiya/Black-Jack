
const outputArea= document.getElementById('output-area');
const newgameButton = document.getElementById('new-game-button');
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');
const winnerArea = document.getElementById('winner-area');
outputArea.innerHTML='';
let playerScore = 0;
let dealerScore = 0;
hideGameButtons();

let cards=[
    {card: '🂡', value: 1},
    {card:'🂢', value: 2},
    {card:'🂣', value: 3},
    {card:'🂤', value: 4},
    {card:'🂥', value: 5},
    {card:'🂦', value: 6},
    {card:'🂧', value: 7},
    {card:'🂨', value: 8},
    {card:'🂩', value: 9},
    {card:'🂪', value: 10},
    {card:'🂫', value: 10},
    {card:'🂭', value: 10},
    {card:'🂮', value: 10},

    {card: '🂡', value: 1},
    {card:'🂢', value: 2},
    {card:'🂣', value: 3},
    {card:'🂤', value: 4},
    {card:'🂥', value: 5},
    {card:'🂦', value: 6},
    {card:'🂧', value: 7},
    {card:'🂨', value: 8},
    {card:'🂩', value: 9},
    {card:'🂪', value: 10},
    {card:'🂫', value: 10},
    {card:'🂭', value: 10},
    {card:'🂮', value: 10},

    {card: '🂡', value: 1},
    {card:'🂢', value: 2},
    {card:'🂣', value: 3},
    {card:'🂤', value: 4},
    {card:'🂥', value: 5},
    {card:'🂦', value: 6},
    {card:'🂧', value: 7},
    {card:'🂨', value: 8},
    {card:'🂩', value: 9},
    {card:'🂪', value: 10},
    {card:'🂫', value: 10},
    {card:'🂭', value: 10},
    {card:'🂮', value: 10},

    {card: '🂡', value: 1},
    {card:'🂢', value: 2},
    {card:'🂣', value: 3},
    {card:'🂤', value: 4},
    {card:'🂥', value: 5},
    {card:'🂦', value: 6},
    {card:'🂧', value: 7},
    {card:'🂨', value: 8},
    {card:'🂩', value: 9},
    {card:'🂪', value: 10},
    {card:'🂫', value: 10},
    {card:'🂭', value: 10},
    {card:'🂮', value: 10},

];

//cards.forEach(element=>outputArea.innerHTML += element.card)

//console.log(cards);
 
/* 
for(let i=0; i<cards.length; i++){
    
    outputArea.innerHTML += cards[i].value;


}  */


/* cards.forEach(element=>cards[element].cards); */


let deck = [];

suffleDeck=()=>{
    let tmpDeck=cards.slice(0);
    //console.log(tmpDeck);
    
    while(tmpDeck.length > 0){
        let pos = Math.floor((Math.random()* tmpDeck.length));
        let card = tmpDeck.splice(pos, 1)
        deck.push(...card);
    }
}
//suffleDeck();

/* for(let i=0; i<deck.length; i++){
    outputArea.innerHTML += deck[i].card;
} */

//cards.forEach(element=>outputArea.innerHTML += element.card)


//deck.forEach(element=>outputArea.innerHTML += `Card is: ${element.card} and value is ${element.value} </br>`);

drawCard=()=>{
    return deck.shift();   // let a= deck.shift();  must return  deck.shift()
    
}
//outputArea.innerHTML += drawcard().card;
//outputArea.innerHTML += drawcard().card;



let dealer = [];
let player = [];

showHand=(hand, score)=>{

    let cards='';
   
    for(let i=0; i<hand.length; i++)
     {
        cards += hand[i].card;
      }
/* let dealerCards='';
for(let i=0; i<dealer.length; i++)
    {
   dealerCards += dealer[i].card;
    } */
    //outputArea.innerHTML += cards + ' '+ `${score}` + '<br>';
    
    //return cards + ' '+ score + '<br>';
return `${cards} ${score}<br>`;

}

clearTable=()=>{
    outputArea.innerHTML = '';
}


dealInitialCards=()=>{
    
    player.push(drawCard());
    player.push(drawCard());
    dealer.push(drawCard());
    dealer.push(drawCard());
    
    /* outputArea.innerHTML += player.card;
    outputArea.innerHTML += dealer.card; */
    
    showHands();
}


calculateHand=(cards)=>{
    let score = 0;
    let hasAce = cards.find(card=>card.value===1)!==undefined;
    
    cards.forEach((card)=> score += card.value);
    
    if(hasAce && score + 10 <= 21){
        score = score + 10;
    }
    return score;
    
}
//dealInitialCards();


startNewGame=()=>{
    showGameButtons(); // from 10, show/hide are taken to 10
    deck = [];
    player = [];
    dealer = [];
    suffleDeck();
    dealInitialCards();
    
}


newgameButton.addEventListener('click', function(){
    startNewGame();
    
}
)

// 10

hasBlackJack=(hand, score)=>{
    if(hand.length===2 && score===21)
    return true;
    
}

isBust=(score)=>{
    if(score > 21)
    return true;
}

determineWinner=(stayed)=>{
    /* if(stayButton.clicked == true){
        stayed = true;
    } */
    const dealerWins = 'Dealer wins!';
    const playerWins = 'You win!';
    const draw = 'Draw';
    
    if(playerScore > 21){
        return dealerWins;
    }else if(dealerScore > 21){
        return playerWins;
    }else if(dealer.length==5 && dealerScore <= 21){
        return dealerWins;
    }else if(playerScore==dealerScore && stayed){
        return draw;
    }else if(playerScore > dealerScore && stayed){
        return playerWins;
    }else if(dealerScore > playerScore && stayed){
        return dealerWins;
    } else
    {
        let dealerBJ = hasBlackJack(dealer, dealerScore);
        let playerBJ = hasBlackJack(player, playerScore);
        if(dealerBJ === true && playerBJ===true){
            return draw;
        }
        if(playerBJ===true){
            return playerWins;
        }
        if(dealerBJ===true){
            return dealerWins;
        }
        
    }
    return '';
    
}
//9
showHands=(stayed=false)=>{
    
    
    playerScore = calculateHand(player);
    dealerScore = calculateHand(dealer);
    clearTable();
    outputArea.innerHTML += showHand(dealer, dealerScore);
    outputArea.innerHTML += showHand(player, playerScore);
    let winner = determineWinner(stayed);
    winnerArea.innerHTML = winner;
    if(winner!==''){
        hideGameButtons();
    }
 }
 
 dealAnotherCard=(hand)=>{
     hand.push(drawCard());
     
    }
    
    hitButton.addEventListener('click', function(){
        dealAnotherCard(player);
        showHands();
    })
    
    function showGameButtons(){
        
        newgameButton.style.display = 'none';
        hitButton.style.display = 'inline';
        stayButton.style.display='inline'
}
    function hideGameButtons(){
        
    newgameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display='none'
}

//11

stayButton.addEventListener('click',function(){
    hideGameButtons();
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 17){
        dealer.push(drawCard());
        showHands(true);
    }
    showHands(true);
})