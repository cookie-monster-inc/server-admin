var sitesController = require('../../app/controllers/sites');

describe('The sites controller', function(){
  describe('The index route', function(){
    before(function(){
      response.json = sinon.spy();
    })
    it('should have an index route', function(){
      expect(sitesController.index).to.exist;
    })
    it('should render a json array', function(){
      sitesController.index(request, response);
      expect(response.json.called).to.be.true;
      expect(response.json.args[0][0] instanceof Array).to.be.true
    })
    describe('the response', function(){
      before(function(){
        dataMock = {
          sites: [
          {name: 'test'},
          {name: 'test2'}]
        };
        var controllerMock = proxyquire('../app/controllers/sites', {
          '../../data.json': dataMock
        });
      })
      it('should render the data.json sites', function(){
        sitesController.index(request, response);
        expect(response.json.calledWith(dataMock.sites))
      })
    })
  })
})