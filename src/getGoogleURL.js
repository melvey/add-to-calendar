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
