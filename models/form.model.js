const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const FieldSchema = new Schema({
  fieldName: { type: String, required: true },
  fieldLabel: { type: String, required: true },
  fieldType: { type: String, default: "text" },
  required: { type: Boolean, default: false }
}, { timestamps: true })

const SectionSchema = new Schema({
  sectionName: { type: String, required: true },
  fields: [FieldSchema]
}, { timestamps: true })

const Field = mongoose.model(
  "Field",
  FieldSchema
)

const Section = mongoose.model(
  "Section",
  SectionSchema
)

const Form = mongoose.model(
  "Form",
  new Schema({
    formName: { type: String, required: true },
    sections: [SectionSchema]
  }, { timestamps: true })
)

module.exports = { Field, Section, Form };