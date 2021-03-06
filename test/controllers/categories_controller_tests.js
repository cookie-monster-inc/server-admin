describe('The Categories controller', function(){
  before(function(){
    categoryMock = {
      findAll: function(callback){
        callback(null, dataMock.categories);
      },
      find: function(title,callback){
        callback(null, dataMock.categories[0]);
      }
    }
    categoriesController = proxyquire('../app/controllers/categories', {
      '../models/category': categoryMock
    });
  })
  describe('the index route', function(){
    before(function(){
      sinon.spy(response, 'json');
    })
    after(function(){
      response.json.restore();
    })
    it('should exist', function(){
      expect(categoriesController.index).to.exist;
    })
    it('should render a json array', function(){
      categoriesController.index(request, response);

      expect(response.json.called).to.be.true;
      expect(response.json.args[0][0] instanceof Array).to.be.true;
    })
    it('should render the first category', function(){
      categoriesController.index(request, response);
      var categories = dataMock.categories
      expect(response.json.calledWith(categories)).to.be.true;
    })
  })
  describe('the show route', function(){
    before(function(){
      sinon.spy(response, 'json');
      request.params = { title: 'test' }
    })
    after(function(){
      response.json.restore();
    })
    it('should exist', function(){
      expect(categoriesController.show).to.exist;
    })
    it('should render a json object', function(){
      categoriesController.show(request, response);

      expect(response.json.called).to.be.true;
      expect(response.json.args[0][0] instanceof Array).to.be.false
    })
    it('should render the first category', function(){
      categoriesController.show(request, response);
      var category = dataMock.categories[0]
      expect(response.json.calledWith(category)).to.be.true;
    })
  })
})