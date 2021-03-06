'use strict';
var React = require('react');

module.exports = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    rating: React.PropTypes.number.isRequired,
    outOf: React.PropTypes.number,
    blankIcon: React.PropTypes.node
  },

  render: function() {
    var $rating = [];
    var $blankRating = [];

    for (var i = 0; i < this.props.rating; i++) {
      $rating.push( this.props.children ? this.props.children : <span className="rating-icon" /> );
    }

    if (this.props.outOf && this.props.blankIcon) {
      for (var j = 0; j < ( this.props.outOf - this.props.rating ); j++) {
        $blankRating.push( this.props.blankIcon );
      }
    }

    return (
      <div className="ui-component-rating">
        {$rating}
        {$blankRating}
      </div>
    );
  }
});
