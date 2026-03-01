import sqlite3
import models.event as Event
def create_table():
    cursor.execute('CREATE TABLE IF NOT EXISTS events (interest TEXT, name TEXT, address TEXT, lat TEXT, lng TEXT, timedate DATETIME)')


with sqlite3.connect('events.db') as connection:
    cursor = connection.cursor()

    create_table()

#address, lat, lng are stored separately in table but together under "location" in Event.
def addEvent(interest, name, address, lat, lng, timedate):
    location = Event.Location.createLocation(address, lat, lng)
    newEvent = Event.createEvent(interest, name, location, timedate)
    cursor.execute('INSERT INTO events VALUES (?, ?, ?, ?, ?, ?)', (newEvent.interest, newEvent.name, newEvent.location.address, newEvent.location.lat, newEvent.location.lng, newEvent.timedate))


def getEvents(interest):
    events = []
    for row in cursor.execute('SELECT * FROM events WHERE interest = ?', (interest,)):
        events.append(Event(row[0], row[1], row[2], row[3]))
    return events 

def getTopTenEventsByDate():
    events = []
    for row in cursor.execute('SELECT * FROM events ORDER BY time DESC LIMIT 10'):
        events.append(Event(row[0], row[1], row[2], row[3]))
    return events
