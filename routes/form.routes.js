module.exports = app => {
  const forms = require('../controllers/form.controller.js');

  var router = require('express').Router();

  router.get('/', forms.findAll);
  router.get('/:formId', forms.findById);
  router.get('/sections', forms.findAllSections);
  router.get('/fields', forms.findAllFields);

  router.post('/', forms.createSchema);

  app.use('/api/forms', router);
}