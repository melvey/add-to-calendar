const getGoogleURL = require('./getGoogleURL');
const getYahooURL = require('./getYahooURL');
const getIcalURI = require('./getIcalURI');

/*
 * <div class="container">
 * 	<button class="toggle">Add to calendar</button>
 * 	<div class="list">
 * 		<a class="link" href="link.url">
 * 			<img class="icon" src="link.icon" />
 * 			<span class="title">link.title</span>
 * 		</a>
 * 	</div>
 * </div>
 */

const types = {
	google: getGoogleURL,
	yahoo: getYahooURL,
	ical: getIcalURI
};
 
function toggleClicked(button, className) {
	// handle if classlist is not supported
	button.parentNode.classList.toggle(className);
}

function getLink(link, event, classPrefix) {

	const anchor = document.createElement('a');
	anchor.className = classPrefix + '__link';
	const type = typeof link === 'string' ? link : link.type;
	anchor.href = types[type](event);
	anchor.target = '_blank';

	if(link.icon) {
		const icon = document.createElement('img');
		icon.src = link.icon;
		icon.className = classPrefix + '__icon';
		anchor.appendChild(icon);
	}

	const title = document.createElement('span');
	title.className = classPrefix + '__title';
	title.innerText = link.title
		? link.title
		: type.charAt(0).toUpperCase() + type.substr(1);
	anchor.appendChild(title);
	
	return anchor;
}

 /**
	* Return a button to create an unstyled button to add an event to the calendar
	* @param {object} params Configuration object
	* @param {string} params.classPrefix Class-prefix to prepend to all classes in the container to allow seperate styling for different buttons. Defaults to add-to-calendar-
	* @param {object} event The event to create calendar events for
	* @param {object|string[]} links Optional array of calendar links to slide out from the button. Should either be an object configuration or the keyword 'google', 'yahoo' or 'ical' for defaults.
	* @param {string} links[].title The link title 
	* @param {string} links[].icon The link icon url
	* @param {string} links[].type The link type to provide. One of 'google', 'yahoo' or 'ical'.
	**/
function getButton(params) {
	console.log(params);
	const classPrefix = params.classPrefix || 'add-to-calendar';
	const list = params.list || ['google', 'yahoo', 'ical'];

	const container = document.createElement('div');
	container.className = classPrefix + '__container';

	const button = document.createElement('button');
	button.className = classPrefix + '__btn';
	const activeClass = classPrefix + '--active';
	button.addEventListener('click', function(evt) {
		toggleClicked(evt.target, activeClass);
	});
	container.appendChild(button);

	const listElem = document.createElement('div');
	listElem.className = classPrefix + '__list';
	container.appendChild(listElem);

	console.log(list);
	for(let i = 0; i < list.length; i++) {
		console.log(list[i]);
		listElem.appendChild(
			getLink(list[i], params.event, classPrefix)
		);
	}
	return container;
}

module.exports = getButton;
