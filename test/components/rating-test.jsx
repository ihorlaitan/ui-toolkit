'use strict';
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assert = require('chai').assert;
var Rating = require('../../src/components/rating/rating.jsx');

describe('Rating', function() {

  describe('with a rating of 4 passed in', function() {
    it('is an element', function() {
      var component = TestUtils.renderIntoDocument(
        <Rating rating={4} />
      );
      assert.isDefined(component);
    });

    describe('with a child prop', function() {
      it('is an element', function() {
        var component = TestUtils.renderIntoDocument(
          <Rating rating={4}>X</Rating>
        );
        assert.isDefined(component);
      });
    });

    describe('with a blank icon prop', function() {
      it('is an element', function() {
        var component = TestUtils.renderIntoDocument(
          <Rating rating={4} outOf={5} blankIcon='X' />
        );
        assert.isDefined(component);
      });
    });


  });

  

});