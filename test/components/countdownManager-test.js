'use strict';
var CountdownManager = require('../../src/components/countdown/lib/countdownManager');
var countdown = require('../../src/components/countdown/lib/countdown');
var assert = require('chai').assert;
var moment = require('moment');
var Moment = moment().constructor;
var sinon = require('sinon');

describe('Countdown Manager', function() {

  var sandbox;
  var clock;
  var date;
  var countdownManager;
  var callbackSpy;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    clock = sandbox.useFakeTimers();
    date = {
      startDate: '2016-07-27'
    };
    countdownManager = new CountdownManager(date);
    callbackSpy = sandbox.spy();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('start', function() {

    beforeEach(function() {
      countdownManager.start(callbackSpy);
      clock.tick(CountdownManager.countdownInterval);
    });

    it('sets interval countdown', function() {
      assert.ok(callbackSpy.called);
    });

  });

  describe('stop', function() {

    beforeEach(function() {
      countdownManager.stop(callbackSpy);
      clock.tick(CountdownManager.countdownInterval);
    });

    it('clears interval countdown', function() {
      assert.equal(callbackSpy.called, false);
    });

    it('returns an instance of moment', function() {
      assert.ok(countdownManager.stop() instanceof Moment);
    });

  });

  describe('restart', function() {
    var countdownStartStub;
    var countdownStopStub;
    var dateToPass = '1970-01-01T13:00';

    beforeEach(function() {
      countdownStartStub = sandbox.stub(countdownManager, 'start');
      countdownStopStub = sandbox.stub(countdownManager, 'stop');
    });

    describe('with no date passed', function() {

      beforeEach(function() {
        countdownManager.restart();
      });

      it('should call stop', function() {
        assert.ok(countdownStopStub.calledOnce);
      });

      it('should call start', function() {
        assert.ok(countdownStartStub.calledOnce);
      });

    });

    describe('with a date passed', function() {

      beforeEach(function() {
        countdownManager.restart();
      });

      it('should update the date property', function() {
        assert(countdownManager.date, dateToPass);
      });

    });
  });

  describe('intervalCounter', function() {

    var intervalFunction = null;

    beforeEach(function() {
      sandbox.stub(countdownManager, 'time').returns('test');
      intervalFunction = countdownManager.intervalCounter(callbackSpy);
      intervalFunction();
    });

    it('returns a callback', function() {
      assert.ok(callbackSpy.called);
    });

    it('the callback passes through the value of the time function', function() {
      assert.ok(callbackSpy.calledWith('test'));
    });

  });

  describe('countdownDate', function() {

    describe('when a callback is provided', function() {

      beforeEach(function() {
        countdownManager.countdownDate(callbackSpy);
      });

      it('calls back with startDate', function() {
        assert.ok(callbackSpy.calledWith(date.startDate));
      });

    });

    describe('when no callback is provided', function() {

      var result = null;

      beforeEach(function() {
        result = countdownManager.countdownDate();
      });

      it('returns startDate', function() {
        assert.equal(result, date.startDate);
      });

    });

  });

  describe('time', function() {

    var countdownUntilStub = null;
    var countdownDateValue = null;
    var currentMoment = null;

    beforeEach(function() {
      countdownUntilStub = sinon.stub(countdown, 'until');
      sandbox.stub(countdownManager, 'countdownDate').returns(countdownDateValue);

      currentMoment = 'test';
      countdownManager.time(currentMoment);
    });

    it('calls countdown until with countdownDate & currentMoment', function() {
      assert.ok(countdownUntilStub.calledWith(countdownDateValue, currentMoment));
    });
  });

  describe('hasDatePassed', function() {

    describe('when the start date has passed', function() {
      beforeEach(function() {
        sandbox.stub(countdownManager, 'countdownDate').returns('1969-12-31T23:59');
      });

      it('should return true', function() {
        assert.isTrue(countdownManager.hasDatePassed());
      });
    });

    describe('when the start date is in the future', function() {
      beforeEach(function() {
        sandbox.stub(countdownManager, 'countdownDate').returns('1970-01-01T00:01');
      });

      it('should return false', function() {
        assert.isFalse(countdownManager.hasDatePassed());
      });
    });

  });

});
