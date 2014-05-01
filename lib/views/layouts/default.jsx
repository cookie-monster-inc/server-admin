/** @jsx React.DOM */

var React = require('react');
var CSS = ['css/style.css'];
var JS = [
    'http://fb.me/react-0.10.0.js',
    'http://code.jquery.com/jquery-1.10.0.min.js',
    'js/output.min.js'
    ];

var DefaultLayout = React.createClass({
  buildStyles: function(styles){
    var cssTags = styles.map(function (css, index) {
      return <link key={'css-'+index} rel="stylesheet" href={css} />;
    });
    return cssTags;

  },
  buildJavascripts: function(javascripts){
    var jsTags = javascripts.map(function(js, index){
      return <script key={'js-'+index} src={js} />;
    });
    return jsTags;
  },
  render: function() {
    var styles = this.buildStyles(CSS);
    var javascripts = this.buildJavascripts(JS);

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          {styles}
          {javascripts}
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
})

module.exports = DefaultLayout;