/*!
 * @author myax <mig_dj@hotmail.com>
 * date 7/6/2017
 * data generator.
 */
const fs = require('fs'),
    empty = require('is-empty'),
    guid = require('guid'),
    moment = require('moment'),
    // dates = require('./data/dates.json'),
    dates = [],
    stores = ['Totonicapan', 'San Cristobal', 'Quetzaltenango', '4 Caminos'],
    types = ['Tarjeta', 'Efectivo'],
    products = [
        { n: 'Pan dulce', c: 0.33 },
        { n: 'Pan frances', c: 0.33 },
        { n: 'Pan de yemas', c: 1 },
        { n: 'Xeca', c: 3 },
        { n: 'Champurrada', c: 1 },
        { n: 'Pirujo', c: 1 },
        { n: 'Concha', c: 1.5 },
        { n: 'Cubiletes', c: 1.5 },
        { n: 'Pan galleta', c: 1 },
    ];
/**
 * @method getIndex obtiene un numero aleatorio
 * @param {Number} limit  `10` limite
 * @return {number} index `0` numero aleatorio
 * @private
 */
let rand = function (max, min) {
    max = max || 10;
    min = min || 0;
    return Math.floor((Math.random() * max)) + min;
};

let randDate = function (y, m) {
    let date = [rand(31, 1), rand(12, 1), y];

    while (!moment(date.join('/'), 'DD/MM/YYYY').isValid()) {
        date[0] = rand(31);
    }
    return {
        f: date.join('/'),
        d: date[0],
        m: date[1], y: date[2]
    };
};

// // let sales = dates.map(function (d, i) {
let date = {},
    unit = 0,
    prod = {},
    sales = [],
    pl = products.length;

let large = 100000,
    year = 2012,
    /**
     * @todo corregir implementacion de rangos
     */


    /**
     * @todo corregir implementacion de rangos
     */
    range = [12, 13, 22, 23, 30].map(function (e, i, a) {
        return large * (e / 100);
    }),
    cursor = 0;

for (var i = 0; i < range.length; i++) {
    ++year;
    for (var j = 0; j < range[i]; j++) {

        date = randDate(year);
        unit = rand(300);
        prod = products[rand(pl)];

        sales.push({
            i: guid.raw(),
            t: stores[rand(3)],
            y: date.y,
            f: date.f,
            tp: types[rand(1)],
            p: prod.n,
            u: unit,
            uc: prod.c,
            m: parseFloat(unit * prod.c).toFixed(2)
        });
    }
}
// });

fs.writeFile('data/sales.json', JSON.stringify(sales), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Writed');
});
