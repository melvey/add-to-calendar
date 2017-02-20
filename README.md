# AddToCal

A simple JS library to generate "add to calendar" URLs for upcoming events. Packaged as a JS module to allow for more versatile usage.

## Usage
Import the module and use the provided functions to generate URLs to add your event to external calendar platforms.

Available functions include

* getGoogleURL(event)
* getYahooURL(event)
* getIcalURI(event)

The event requires the following fields

* title - (string) The event title
* start - (Date) The event start date
* duration - (number) The duration of the event in minutes
* end (optional) - (Date) The end time for the event. This will override the duration if set
* address - (string) Where the event is occurring
* description - (string) A more detailed description of the event

Call 'createCalendar' with your event info, pass in any optional parameters such as a class and/ or id and boom! Insert your add-to-calendar div wherever you'd like.

The only fields that are mandatory are:

  - Event title
  - Start time
  - Event duration, in minutes

## Example
    var addToCal = require('./addToCal.js');
    var googleLink = document.getElementById('addToGoogle');
    googleLink.setAttribute('href', addToCal.getGoogleURL({
      title: 'Friday drinks',
      start: new Date('2017-02-24'),
      duration: 60,
      address: 'Breakout room',
      description: 'Office end of week catch up'
    });


## License
[MIT](http://opensource.org/licenses/MIT)
