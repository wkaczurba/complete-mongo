DriversController = require('../controllers/drivers_controller')

module.exports = (app) => {
    // This works and is preferred:
    app.get('/api', DriversController.greeting);
    app.post('/api/drivers', DriversController.create);
    app.put('/api/drivers/:id', DriversController.edit);
    app.delete('/api/drivers/:id', DriversController.delete);
};
