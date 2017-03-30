'use strict';
let Hero = require('./app/models/hero');
let mongoose = require('mongoose');

const heroes  = [
    {nick: 'Professor X', name: 'Charles Francis Xavier'}, 
    {nick: 'Angel', name: 'Warren Kenneth Worthington'}, 
    {nick: 'Mimic', name: 'Calvin Montgomery Rankin'}, 
    {nick: 'Banshee', name: 'Sean Cassidy'}, 
    {nick: 'Havok', name: 'Alexander Summers'},
    {nick: 'Vulcan', name: 'Gabriel Summers'},
    {nick: 'Cyclops', name: 'Scott Summers'}, 
    {nick: 'Beast', name: 'Henry Philip McCoy'}, 
    {nick: 'Nightcrawler', name: 'Kurt Wagner'}, 
    {nick: 'Wolverine', name: 'James Howlett'}, 
    {nick: 'Storm', name: 'Ororo Monroe'},
    {nick: 'Colossus', name: 'Piotr Nikolaievitch'},
    {nick: 'Rogue', name: 'Anna Marie'}
];

module.exports.seedDb = function (){

    // empty collection in our DB
    Hero.remove({}, function(err) { 
        if(err) { console.log(err);}
    });

    // insert our heroes array
    Hero.collection.insert(heroes, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log( docs.insertedCount, 'heroes  were successfully stored.');
        }
    });
}

