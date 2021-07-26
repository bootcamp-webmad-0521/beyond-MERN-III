const { Schema, model } = require("mongoose")

const coasterSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El nombre de la montaña rusa es obligatorio'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  inversions: Number,
  length: Number,
  imageUrl: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Coaster = model("Coaster", coasterSchema)

module.exports = Coaster