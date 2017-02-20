
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
	msInMinutes: MS_IN_MINUTES
};
