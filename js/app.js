var connectfive = require('./connect5framework');
connectfive.init(20);
connectfive.draw();

var sleep = function(s){
    var e = new Date().getTime() + (s * 1000);
    while (new Date().getTime() <= e) {}
};

var dani = require('./connect5_dani');
var nextMove = [];

var currentPlayer = 1;
connectfive.setPlayer(1, dani);
connectfive.setPlayer(2, dani);
while(connectfive.finished() === false)
{
    nextMove = connectfive.getMove(currentPlayer);

    connectfive.playMove(currentPlayer, nextMove);

    currentPlayer++;
    if (currentPlayer > 2)
    {
        currentPlayer = 1;
    }

    connectfive.draw();
    //sleep(1);
}

console.log("Winner " + connectfive.finished());
