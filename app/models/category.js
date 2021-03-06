var Color = require('./color');
var Category = function(Color){
  var categorySchema = new Schema({
    idName: {type: String, unique: true},
    title: {type: String, unique: true},
    color: {type: Color}
  })
  categorySchema.path('title').required(true, "The category's name must not be empty");
  categorySchema.path('idName').required(true, "The category's idName must not be empty");
  categorySchema.path('color').required(true, "You need a color for each category");
  

  var _model = mongoose.model('Category', categorySchema);
  var _filterData = function(category){
    return {
          id: category._id,
          title: category.title,
          idName: category.idName,
          color: category.color.hex
        }
  }
  var _findAll = function(callback){
    _model.find({}, function(err,categories){
      categories = categories.map(function(category){
        return _filterData(category)
      });
      callback(err,categories)
    });

  }

  var _find = function(title, callback){
    _model.findOne({title: title}, function(err, category){
      callback(err, _filterData(category));
    })
  }

  return {
    schema: categorySchema,
    model: _model,
    findAll: _findAll,
    find: _find,
    filterData: _filterData
  }
}(Color)

module.exports = Category;