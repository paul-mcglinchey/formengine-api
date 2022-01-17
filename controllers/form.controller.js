const db = require('../models');
const { Field, Section, Form } = db.form;

// Read operations
exports.findAll = (req, res) => {
  Form.find({})
    .then(forms => {
      res.send({
        data: forms
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving forms from the database.`
      })
    })
}

exports.findById = (req, res) => {
  Form.findById(req.params.formId)
    .then(forms => {
      if (forms.length === 0) {
        res.sendStatus(404);
      }
      res.send({
        data: forms
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving form with id ${req.params.formId}.`
      })
    })
}

exports.findAllSections = (req, res) => {
  Section.find({})
    .then(sections => {
      res.send({
        data: sections
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving sections from the database.`
      })
    })
}

exports.findAllFields = (req, res) => {
  Field.find({})
    .then(fields => {
      res.send({
        data: fields
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving fields from the database.`
      })
    })
}

// CUD Operations
exports.createSchema = (req, res) => {

  // instantiate the Form object
  const form = new Form;

  form.formName = req.body.name;
  form.sections = req.body.sections.map(s => {
    let _tempSection = new Section({
      sectionName: s.name,
      fields: {}
    })

    for (var key of Object.keys(s.fields)) {
      // creates maps of the fields passed in
      _tempField = new Field({
        fieldName: s.fields[key].fieldName,
        fieldType: s.fields[key].fieldType,
        fieldLabel: s.fields[key].fieldLabel,
        required: s.fields[key].required
      });

      // saves the field to the database on it's own
      // TODO: check if the field already has a match and use that instead of creating a new field
      _tempField.save(_tempField).catch(err => res.status(401).send({ error: err.message || `Could not add the field ${_tempField.fieldName}.` }));

      // set the fields kvp to the passed in kvp
      _tempSection.fields.set(key, _tempField);
    }

    // save the section to the database, same TODO as above
    _tempSection.save(_tempSection).catch(err => res.status(401).send({ error: err.message || `Could not add the section ${_tempSection.sectionName}` }));

    return _tempSection;
  })

  form
    .save(form)
    .then(() => {
      res.status(200).send({
        success: `Form ${req.body.name} created successfully.`
      });
    })
    .catch(err => {
      res.status(401).send({
        error: err.message || `Could not add form ${req.body.name}.`
      });
    });
}