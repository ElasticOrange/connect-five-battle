var Gamer = {
    marker: undefined
};

Gamer.init = function(marker){
    this.marker = marker;
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
