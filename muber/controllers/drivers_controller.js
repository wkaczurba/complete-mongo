module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there'});
    },
    create(req, res) {
        console.log(req.body); // body will be parsed by bodyParser
        res.send({ hi: 'there' })
    }
};
