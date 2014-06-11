var Color = function(){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var colorSchema = new Schema({
    title: {type: String},
    hex: {type: String}
  })

  colorSchema.path('title').required(true, "The color title cannot be empty");
  colorSchema.path('hex').required(true, "The color's hex code cannot be empty");

  var _model = mongoose.model('Color', colorSchema); 
  return {
    schema: colorSchema,
    model: _model
  }
}();

module.exports = Color;