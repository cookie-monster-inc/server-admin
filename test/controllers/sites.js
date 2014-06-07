var expect = require('chai').expect;
var sinon = require('sinon');
var sitesController = require('../../app/controllers/sites');

describe('The sites controller', function(){
  before(function(){
    request = {};
    response = {};
  })
  describe('The index route', function(){
    it('should have an index route', function(){
      expect(sitesController.index).to.exist;
    })
    it('should render json', function(){
      response.json = sinon.spy();
      sitesController.index(request, response);
      expect(response.json.called).to.be.true;
    })
  })
})