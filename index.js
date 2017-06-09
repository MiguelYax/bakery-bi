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
    stores = [
        { n: 'Totonicapan', la: 14.911624, lo: -91.361489, p: 5 },
        { n: 'Quetzaltenango', la: 14.833474, lo: -91.517671, p: 5 },
        { n: '4 Caminos', la: 14.908310, lo: -91.441229, p: 2 },
        { n: 'San Cristobal', la: 14.918593, lo: -91.441145, p: 1 },
        { n: 'Salcaja', la: 14.878946, lo: -91.459143, p: 3 }],
    types = ['Tarjeta', 'Efectivo'],
    products = [
        { n: 'Pan dulce', c: 0.33, p: 6 },
        { n: 'Pan frances', c: 0.33, p: 4 },
        { n: 'Pan de yemas', c: 1, p: 3 },
        { n: 'Xeca', c: 3, p: 1 },
        { n: 'Concha', c: 1.5, p: 1 },
        { n: 'Champurrada', c: 1, p: 2 },
        { n: 'Pirujo', c: 1, p: 1 },
        { n: 'Cubiletes', c: 1.5, p: 1 },
        { n: 'Pan galleta', c: 1, p: 1 },
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
        m: date[1],
        y: date[2]
    };
};

// // let sales = dates.map(function (d, i) {
let date = {},
    unit = 0,
    prod = {},
    sales = [],
    ct = 0,
    store = {},
    sl = stores.length,
    pl = products.length;

let large = 100000,
    year = 2012,
    range = [12, 13, 22, 23, 30].map(function (e, i, a) {
        return large * (e / 100);
    }),
    cursor = 0;

for (var i = 0; i < range.length; i++) {
    ct = range[i] * 0.27;
    for (var j = 0; j < range[i]; j++) {
        date = randDate(year);
        store = stores[rand(sl)];
        prod = products[rand(pl)];
        unit = rand(50) * store.p * prod.p;
        sales.push({
            i: guid.raw(),
            t: store.n,
            y: date.y,
            f: date.f,
            tp: types[(ct > j) ? 0 : 1],
            p: prod.n,
            u: unit,
            uc: prod.c,
            //     lat: store.la,
            //     long: store.lo,
            m: parseFloat(unit * prod.c).toFixed(2)
        });
    }
    ++year;
}
// });

fs.writeFile('data/sales.json', JSON.stringify(sales), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Writed');
});
