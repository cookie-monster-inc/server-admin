var AJAX = (function(){
  var _request = function(data, complete, error){
    $.ajax({
      url: data.url,
      datatype: data.datatype,
      success: function(data) {
        complete({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        error(status, err.toString());
      }
    });
  };

  return {
    getData: function(happyCallback, unhappyCallback){
      _request({url: "data.json", datatype: 'json'}, happyCallback, unhappyCallback);
    },
    getSABStatus: function(sab, happyCallback, unhappyCallback){
      var url = sab.link + '/api?mode=qstatus&output=json&apikey=63f498f611d49d9f32d688e2c6dd247d';
      _request({url:url, datatype: 'jsonp'}, happyCallback, unhappyCallback);
     },
    request: function(config, happyCallback, unhappyCallback){
      _request(config, happyCallback, unhappyCallback);
    }
  };
}());




var SABNZBD = function(opts){
  this.link = opts.link;
  this.api = opts.api;
  this.paused = false;
  this.mode = {
    status: 'qstatus',
    pause: 'pause',
    resume: 'resume'
  };
};

SABNZBD.prototype = {
  // Tools
  buildURL: function(mode){
    return this.link + '/api?mode='+ this.mode[mode] +'&output=json&apikey='+ this.api;
  },
  getAPICall: function(url, callback){
    AJAX.request({url:url, datatype: 'json'}, callback, this.unhappyCallback);
  },
  unhappyCallback: function(status, error){
    console.log(status, error);
  },
  addReadToCallback: function(callback){
    var newCallback = function(data){
      this.paused = data.data.paused;
      callback(data);
      console.log("API Response",data);
    };
    return newCallback;
  },
  // Interface
  getStatus: function(happyCallback){
    var url = this.buildURL('status');
    var callback = this.addReadToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  },
  pause: function(happyCallback){
    var url = this.buildURL('pause');
    var callback = this.addReadToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  },
  resume: function(happyCallback){
    var url = this.buildURL('resume');
    var callback = this.addReadToCallback(happyCallback);
    this.getAPICall(url, callback.bind(this));
  }
};

var AJAXCaller = {
  "sabnzbd": SABNZBD
};