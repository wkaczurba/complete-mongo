const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

    // Non-ES6 approach:
    //let sortArray = {};
    //sortArray[sortProperty] = 1;

    //ES6 approach
    let sortArray = { [sortProperty] : 1 };

    const query = Artist.find()
         .sort(sortArray)
         .skip(offset)
         .limit(limit);

    // the return prokmise should look like:
    // { all: [artists], count: count, offset : offset, limit: limit }
    return Promise.all( [ query, Artist.count() ])
        .then( (result) => {
            return { all: result[0],
                count: result[1],
                offset: offset,
                limit: limit };
            });
};

