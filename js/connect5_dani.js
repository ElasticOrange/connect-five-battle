var Gamer = {
    marker: undefined
};

Gamer.init = function(marker){
    this.marker = marker;
};

Gamer.move = function(table, callback){
    for(i = 0 ; i < table.length ; i++)
    {
        for(j = 0 ; j < table.length ; j++)
        {
            if (table[i][j] === '')
            {
                return [i, j];
            }
        }
    }
};

Gamer.getMove = function(table){
    var x, y;

    do {
        x = Math.floor(Math.random() * table.length);
        y = Math.floor(Math.random() * table.length);
    }
    while (table[x][y] !== '.');

    return [x, y];
};

module.exports = Gamer;
