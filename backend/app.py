from Flask import Flask, jsonify, request, render_template
app = Flask(__name__, template_folder=str(_frontend))


_frontend = Path(__file__).resolve().parent.parent.parent

class Location:
    #Edit this as we figure out google maps
    def __init__(self, zipCode, number, street, city, state):
        self.zipCode = zipCode
        self.number = number
        self.street = street
        self.city = city
        self.state = state
        #self.longitude = longitude
        #self.latitude = latitude

    @classmethod
    def createLocation(cls, zipCode, number, street, city, state):
        return cls(zipCode, number, street, city, state)

class EventDate:
    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year

    @classmethod
    def createEventDate(cls, day, month, year):
        return cls(day, month, year)

class EventTime:
    def __init__(self, hour, minute):
        self.hour = hour
        self.minute = minute

    @classmethod
    def createEventTime(cls, hour, minute):
        return cls(hour, minute)

class Event:
    def __init__(self, interest, name, date, location, time):
        self.interest = interest
        self.name = name
        #Edit location as we change location
        self.location = location
        self.date = date
        #self.capacity = capacity
        self.time = time
    
    @classmethod
    def createEvent(cls, interest, name, date, location, time):
        return cls(interest, name, date, location, time)

                   
def addEvent(interest, name, location, date, time):
    #attributes of address
    myLoc = Location.createLocation(zipCode, number, street, city, state)
    myDate = EventDate.creatEventDate(day, month, year)
    myTime = EventTime.createEventTime(hour, minute)
    newEvent = Event.createEvent(interest, name, myDate, myLoc, myTime)

def getEvents(eventName):
    #get event from database
    return eventName 


@app.route('/addEvent', methods=['POST'])
def add_user():
    user_input = request.json.get('event_data')
    addEvent(user_input.name, user_input.location, user_input.date, user_input.time)
    return jsonify('Event added successfully')

@app.route('/getEvents', methods=['GET'])
def get_users():
    user_input = request.json.get('event_category')
    events = getEvents()
    return jsonify(events)    
# Make a class of events
# Make a class of dashboard
# Make a class of interest its a type

