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
    var x = prompt("[" + this.marker + "] x=", "");
    var y = prompt("[" + this.marker + "] y=", "");

    return [x, y];
};

module.exports = Gamer;
