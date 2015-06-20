var ConnectFive = {
    table: [],
    players: []
};

var verticalLine = function(table, coordinates){
    var n = table.length;
    var line = [];

    if (coordinates[0] + 5 > n){
        return line;
    }

    for (var i = coordinates[0] ; i < coordinates[0] + 5 ; i++){
        line.push(table[i][coordinates[1]]);
    }

    return line;
};

var horizontalLine = function(table, coordinates){
    var n = table.length;
    var line = [];

    if (coordinates[1] + 5 > n){
        return line;
    }

    for (var i = coordinates[1] ; i < coordinates[1] + 5 ; i++){
        line.push(table[coordinates[0]][i]);
    }

    return line;
};

var diagonalRightLine = function(table, coordinates){
    var n = table.length;
    var line = [];

    if ((coordinates[0] + 5 > n) || (coordinates[1] + 5 > n)){
        return line;
    }

    for (var i = 0 ; i < 5 ; i++){
        line.push(table[coordinates[0] + i][coordinates[1] + i]);
    }

    return line;
};

var diagonalLeftLine = function(table, coordinates){
    var n = table.length;
    var line = [];

    if ((coordinates[0] + 5 > n) || (coordinates[1] - 4 < 0)){
        return line;
    }

    for (var i = 0 ; i < 5 ; i++){
        line.push(table[coordinates[0] + i][coordinates[1] - i]);
    }

    return line;
};

var checkLine = function(line){
    var playersFound = [];

    for (var i = 0 ; i < line.length ; i++)
    {
        if (playersFound[line[i]] === undefined)
        {
            playersFound[line[i]] = 1;
        }
        else
        {
            playersFound[line[i]]++;
        }
    }

    for(var player in playersFound)
    {
        if ((playersFound[player] === 5) && (player !== '.'))
        {
            return player;
        }
    }

    return false;
};

var checkWinner = function(table, coordinates){
    line = horizontalLine(table, coordinates);
    player = checkLine(line);
    if (player)
    {
        return player;
    }

    line = verticalLine(table, coordinates);
    player = checkLine(line);
    if (player)
    {
        return player;
    }

    line = diagonalRightLine(table, coordinates);
    player = checkLine(line);
    if (player)
    {
        return player;
    }

    line = diagonalLeftLine(table, coordinates);
    player = checkLine(line);
    if (player)
    {
        return player;
    }

    return false;
};

module.exports.init = function(n){
    ConnectFive.table = new Array(n);
    for(var i = 0 ; i < n ; i++)
    {
        ConnectFive.table[i] = new Array(n);
    }

    for(i = 0 ; i < n ; i++)
    {
        for(j = 0 ; j < n ; j++)
        {
            ConnectFive.table[i][j] = '.';
        }
    }

    /*
    ConnectFive.table = [
        [2,1,1,1,2],
        [2,1,1,2,2],
        [1,1,2,1,1],
        [2,2,1,2,2],
        [1,1,1,1,1],
    ];
    */
};

module.exports.draw = function(currentMove){
    var table_html = '';

    for(var i = 0 ; i < ConnectFive.table.length ; i++)
    {
        for(var j = 0 ; j < ConnectFive.table.length ; j++)
        {
            table_html += '<span>' + ConnectFive.table[i][j] + '</span>';
        }
        table_html += '<br />';
    }

    $('#table').html(table_html);
    console.log(currentMove);
    var nth = currentMove[0] * ConnectFive.table.length + currentMove[1];
    $('#table>span:eq('+ nth +')').css({
        color: '#f00',
        fontWeight: 700
    });
};

module.exports.setPlayer = function(playerNumber, playerObject){
    ConnectFive.players[playerNumber] = playerObject;
    playerObject.init(playerNumber);
};

module.exports.getMove = function(player){
    return ConnectFive.players[player].getMove(ConnectFive.table);
};

module.exports.playMove = function(player, coordinates){
    ConnectFive.table[coordinates[0]][coordinates[1]] = player;
};

module.exports.finished = function(){
    var line, player;
    var free = false;
    var table = this.getTable();

    for(var i = 0 ; i < this.getTable().length ; i++)
    {
        for(var j = 0 ; j < this.getTable().length ; j++)
        {
            winner = checkWinner(this.getTable(), [i, j]);
            if (winner)
            {
                return winner;
            }

            // If there are free spots
            if (table[i][j] == '.'){
                free = true;
            }
        }
    }

    return (!free) || false;
};

module.exports.getTable = function(){
    return ConnectFive.table;
};
