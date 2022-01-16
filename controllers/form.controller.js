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
      sectionName: s.name, fields: s.fields.map(f => {
        let _tempField = new Field({
          fieldName: f.name, fieldType: f.type, fieldLabel: f.label, required: f.required
        })

        _tempField.save(_tempField).catch(err => res.status(401).send({ error: err.message || `Could not add the field ${_tempField.fieldName}` }));

        return _tempField;
      })

    })

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