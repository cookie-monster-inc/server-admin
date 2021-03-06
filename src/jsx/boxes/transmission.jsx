/**
* @jsx React.DOM
*/

var TransmissionContentBox = React.createClass({
  render: function() {
    var ongoing = [];
    var others = [];
    if(this.props.data && this.props.data.ok){
      var statusText = { 
          0: 'STOPPED',
          1: 'CHECK_WAIT',
          2: 'CHECK',
          3: 'DOWNLOAD_WAIT',
          4: 'DOWNLOAD',
          5: 'SEED_WAIT',
          6: 'SEED',
          7: 'ISOLATED' 
        };
      others = this.props.data.others.map(function(item){
        var status = statusText[item.status];
        return  {
          id: item.id,
          title: item.name, 
          status: status + "(" + (item.percentDone * 100).toFixed(2) + "%)"
        }
      })
      ongoing = this.props.data.ongoing.map(function(item){
        var status = statusText[item.status];
        return  {
          id: item.id,
          title: item.name,
          status: status + "(" + (item.percentDone * 100).toFixed(2) + "%)"
        }
      })
    }
    return (
      <div className="contentLists">
        <ItemList items={ongoing} title="Ongoing" />
        <ItemList items={others} title="Others" />
      </div>
    );
  }
})

var TransmissionButtons = (function(){
  var _pauseToggleButton = React.createClass({
    render: function(){
      if(this.props.paused){
        return <a className="bottomButton" href="#" onClick={this.props.callback} >Resume</a>
      } else {
        return <a className="bottomButton" href="#" onClick={this.props.callback} >Pause</a>
      }
    }
  })

  var _cleanAllButton = React.createClass({
    render: function(){
      return <a className="bottomButton" href="#" onClick={this.props.callback} >Clear All</a>
    }
  })

  var _cleanFinishedButton = React.createClass({
    render: function(){
      return <a className="bottomButton" href="#" onClick={this.props.callback} >Clear Finished</a>
    }
  })

  return React.createClass({
    handlePauseToggle: function(e){
      e.preventDefault();
      this.props.model.query('pauseToggle',this.props.refresh,{paused: this.props.data.status.paused});
    },
    handleCleanAll: function(e){
      e.preventDefault();
      this.props.model.query('clean',this.props.refresh);
    },
    handleCleanFinished: function(e){
      e.preventDefault();
      this.props.model.query('cleanFinished',this.props.refresh);
    },
    render: function() {
      if(this.props.data && this.props.data.ok){
        var paused = this.props.data.status.paused;
      } 
      return (
        <div className="customButtons">
          <_pauseToggleButton paused={paused} callback={this.handlePauseToggle} />
          <_cleanAllButton callback={this.handleCleanAll} />
          <_cleanFinishedButton callback={this.handleCleanFinished} />
        </div>
      );
    }
  })
}());


var TransmissionStatusBar = React.createClass({
  render: function(){
    this.props.empty = true;
    return <div />;
  }
})