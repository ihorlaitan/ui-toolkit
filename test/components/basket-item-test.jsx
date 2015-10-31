'use strict';
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assert = require('chai').assert;
var sinon = require('sinon');
var BasketItem = require('../../src/components/basket-item/basket-item.jsx');

describe('BasketItem', function() {

  describe('with no title', function() {
    it('should have an empty title node', function() {
      var basketItem = TestUtils.renderIntoDocument(<BasketItem />);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-title');
      assert.equal(renderedBasketItem.getDOMNode().textContent, '');
    });
  });

  describe('with a title', function() {
    describe('that is text', function() {
      it('should have a title node with the correct text', function() {
        var title = 'A title';
        var basketItem = TestUtils.renderIntoDocument(<BasketItem title={title} />);
        var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-title');
        assert.equal(renderedBasketItem.getDOMNode().textContent, title);
      });

      describe('and the toggleDescription property set to true', function() {
        var anchor;
        var title = 'A title';
        before(function() {
          var basketItem = TestUtils.renderIntoDocument(<BasketItem title={title} toggleDescription={true} />);
          var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-title');
          anchor = TestUtils.findRenderedDOMComponentWithTag(renderedBasketItem, 'a');
        });
        it('should have a title node that contains an anchor', function() {
          assert.equal(anchor.getDOMNode().textContent, title);
        });

        it('the anchor should have an onClick handler function set', function() {
          assert.equal(typeof anchor.props.onClick, 'function');
        });
      });
    });

    describe('that is an element', function() {
      it('should have title node that contains the element passed in', function() {
        var title = <a>Title as an Element</a>;
        var basketItem = TestUtils.renderIntoDocument(<BasketItem title={title} />);
        var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-title');
        var anchor = TestUtils.findRenderedDOMComponentWithTag(renderedBasketItem, 'a');
        assert.isDefined(anchor);
      });
    });
  });

  describe('with no price', function() {
    it('should have an empty total node', function() {
      var basketItem = TestUtils.renderIntoDocument(<BasketItem />);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-total');
      assert.equal(renderedBasketItem.getDOMNode().textContent, '');
    });
  });

  describe('with a price', function() {
    it('should have the correct price in the price node', function() {
      var basketItem = TestUtils.renderIntoDocument(<BasketItem price={123} />);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-price');
      assert.equal(renderedBasketItem.getDOMNode().textContent, 123);
    });

    it('should have the default currency symbol in the currency node', function() {
      var basketItem = TestUtils.renderIntoDocument(<BasketItem price={123} />);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-currency');
      assert.equal(renderedBasketItem.getDOMNode().textContent, '£');
    });

    describe('with a price of zero', function() {
      it('should have the default freeText property in the total node', function() {
        var basketItem = TestUtils.renderIntoDocument(<BasketItem price={0} />);
        var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-total');
        assert.equal(renderedBasketItem.getDOMNode().textContent, 'FREE');
      });
    });

    describe('with a currency symbol passed in', function() {
      it('should have the correct currencySymbol in the currency node', function() {
        var currencySymbol = '@';
        var basketItem = TestUtils.renderIntoDocument(<BasketItem price={123} currencySymbol={currencySymbol} />);
        var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-currency');
        assert.equal(renderedBasketItem.getDOMNode().textContent, currencySymbol);
      });
    });
  });

  

  describe('with a handleRemove property', function() {
    var handleRemove, anchor;
    before(function() {
      handleRemove = function() {
        return null;
      };
      var basketItem = TestUtils.renderIntoDocument(<BasketItem handleRemove={handleRemove} />);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-remove');
      anchor = TestUtils.findRenderedDOMComponentWithTag(renderedBasketItem, 'a');
    });
    it('should have a remove node with an anchor as a child', function() {
      assert.isDefined(anchor);
    });

    it('should have an anchor with an onClick property set to the handleRemove function', function() {
      assert.equal(typeof anchor.props.onClick, 'function');
    });

    it('should have an anchor with the text set to the default removeText property', function() {
      assert.equal(anchor.getDOMNode().textContent, 'remove');
    });
  });

  describe('with no children', function() {
    it('should have an empty description node', function() {
      var basketItem = TestUtils.renderIntoDocument(<BasketItem />);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-description');
      assert.equal(renderedBasketItem.getDOMNode().textContent, '');
    });
  });

  describe('with children', function() {
    it('should have the children passed in as the content of the description node', function() {
      var basketItem = TestUtils.renderIntoDocument(<BasketItem>Foobar</BasketItem>);
      var renderedBasketItem = TestUtils.findRenderedDOMComponentWithClass(basketItem, 'component-basket-item-description');
      assert.equal(renderedBasketItem.getDOMNode().textContent, 'Foobar');
    });
  });

});
