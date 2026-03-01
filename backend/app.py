import services.event_service as es
from flask import Flask, jsonify, request, render_template

_frontend = Path(__file__).resolve().parent.parent.parent
app = Flask(__name__, template_folder=str(_frontend))




@app.route('/addEvent', methods=['POST'])
def add_user():
    user_input = request.json.get('event_data')
    es.addEvent(user_input.interest, user_input.name, user_input.address, user_input.lat, user_input.lng, user_input.timedate)
    return jsonify('Event added successfully')

@app.route('/getEvents', methods=['GET'])
def get_users():
    user_input = request.json.get('event_interest')
    events = es.getEvents(user_input)
    return jsonify(events)    
# Make a class of event
# Make a class of dashboard
# Make a class of interest its a type


'''
class Interest:
    def __init__(self, type):
        self.type = type

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

class EventDate:
    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year

class EventTime:
    def __init__(self, hour, minute):
        self.hour = hour
        self.minute = minute

class Event:
    def __init__(self, name, date, location, time):
        self.name = name
        #Edit location as we change location
        self.location = location
        self.date = date
        #self.capacity = capacity
        self.time = time

def addEvent(name, location, date, time):
    #attributes of address
    myLoc = location(number, street, city, state)
    myDate = date(day, month, year)
    myTime = time(hour, minute)
    newEvent = Event(name, myDate, myLoc, myTime)

def getEvents(eventName):
    #get event from database
    return eventName 

'''


