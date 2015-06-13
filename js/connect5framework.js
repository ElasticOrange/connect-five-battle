var ConnectFive = {
    table: [],
    players: []
};

var horizontalLine = function(table, coordinates){
    var n = table.length;
    var line = new Array(5);

    if (coordinates[0] + 5 > n)
    {
        return line;
    }

    for (i = coordinates[0] ; i < coordinates[0] + 5 ; i++)
    {
        line.push(table[i][coordinates[1]]);
    }

    console.log(line);

    return line;
};

var verticalLine = function(table, coordinates){
    var n = table.length;
    var line = new Array(5);

    if (coordinates[0] + 5 >= n)
    {
        return line;
    }

    for (i = coordinates[0] ; i < coordinates[0] + 5 ; i++)
    {
        line.push(table[i][coordinates[1]]);
    }

    console.log(line);

    return line;
};

var checkLine = function(line){
    var playersFound = [];

    console.log(line);

    for (i = 0 ; i < 5 ; i++)
    {
        playersFound[line[i]]++;
    }

    for(var player in playersFound)
    {
        if (playersFound[player] === 5)
        {
            return player;
        }
    }

    return false;
};

module.exports.init = function(n){
    ConnectFive.table = new Array(n);
    for(i = 0 ; i < n ; i++)
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
};

module.exports.draw = function(){
    var table_html = '';

    for(i = 0 ; i < ConnectFive.table.length ; i++)
    {
        for(j = 0 ; j < ConnectFive.table.length ; j++)
        {
            table_html += ConnectFive.table[i][j];
        }
        table_html += '<br />';
    }

    $('#table').html(table_html);
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

    for(i = 0 ; i < this.getTable().length ; i++)
    {
        for(j = 0 ; j < this.getTable().length ; j++)
        {
            line = horizontalLine(this.getTable(), [i, j]);
            player = checkLine(line);
            if (player)
            {
                return player;
            }
        }
    }

    return false;
};

module.exports.getTable = function(){
    return ConnectFive.table;
};
