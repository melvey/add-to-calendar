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
