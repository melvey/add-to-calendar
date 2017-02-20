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
