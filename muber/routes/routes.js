DriversController = require('../controllers/drivers_controller')

module.exports = (app) => {
    // This works and is preferred:
    app.get('/api', DriversController.greeting);

    // This works:
    //app.get('/api', (req, res) => DriversController.greeting(req, res));

    // This fails:
    //app.get('/api', (req, res) => DriversController.greeting);
};
