(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var getGoogleURL = require('./getGoogleURL');
var getYahooURL = require('./getYahooURL');
var getIcalURI = require('./getIcalURI');

module.exports = {
	getGoogleURL: getGoogleURL,
	getYahooURL: getYahooURL,
	getIcalURI: getIcalURI
};


},{"./getGoogleURL":2,"./getIcalURI":3,"./getYahooURL":4}],2:[function(require,module,exports){
var timeFunctions = require('./timeFunctions');

function getGoogleURL(event) {
	var startTime = timeFunctions.formatTime(event.start);
	var endTime = timeFunctions.calculateEndTime(event);

	return  encodeURI([
		'https://www.google.com/calendar/render',
		'?action=TEMPLATE',
		'&text=' + (event.title || ''),
		'&dates=' + (startTime || ''),
		'/' + (endTime || ''),
		'&details=' + (event.description || ''),
		'&location=' + (event.address || ''),
		'&sprop=&sprop=name:'
	].join(''));
}

module.exports = getGoogleURL;

},{"./timeFunctions":5}],3:[function(require,module,exports){
var timeFunctions = require('./timeFunctions');

function getIcalURI(event) {
	var startTime = timeFunctions.formatTime(event.start);
	var endTime = timeFunctions.calculateEndTime(event);

	return encodeURI(
		'data:text/calendar;charset=utf8,' + [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'BEGIN:VEVENT',
			'URL:' + document.URL,
			'DTSTART:' + (startTime || ''),
			'DTEND:' + (endTime || ''),
			'SUMMARY:' + (event.title || ''),
			'DESCRIPTION:' + (event.description || ''),
			'LOCATION:' + (event.address || ''),
			'END:VEVENT',
			'END:VCALENDAR'].join('\n'));
}

module.exports = getIcalURI;

},{"./timeFunctions":5}],4:[function(require,module,exports){
var timeFunctions = require('./timeFunctions');

function getYahooURL(event) {
	var eventDuration = event.end
		? (event.end.getTime() - event.start.getTime())/ timeFunctions.msInMinutes
		: event.duration;

	// Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
	var yahooHourDuration = eventDuration < 600
		? '0' + Math.floor((eventDuration / 60))
		: Math.floor((eventDuration / 60)) + '';

	var yahooMinuteDuration = eventDuration % 60 < 10
		? '0' + eventDuration % 60
		: eventDuration % 60 + '';

	var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

	// Remove timezone from event time
	var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
																							timeFunctions.msInMinutes))) || '';

	return  encodeURI([
		'http://calendar.yahoo.com/?v=60&view=d&type=20',
		'&title=' + (event.title || ''),
		'&st=' + st,
		'&dur=' + (yahooEventDuration || ''),
		'&desc=' + (event.description || ''),
		'&in_loc=' + (event.address || '')
	].join(''));
}

module.exports = getYahooURL;

},{"./timeFunctions":5}],5:[function(require,module,exports){

var MS_IN_MINUTES = 60 * 1000;

var formatTime = function(date) {
	return date.toISOString().replace(/-|:|\.\d+/g, '');
};

var calculateEndTime = function(event) {
	return event.end ?
		formatTime(event.end) :
		formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
};

module.exports = {
	formatTime: formatTime,
	calculateEndTime: calculateEndTime,
	msInMinutes: MS_IN_MINITES
};

},{}]},{},[1]);
