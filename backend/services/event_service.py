import sqlite3
import models.event as Event
def create_table():
    cursor.execute('CREATE TABLE IF NOT EXISTS events (interest TEXT, name TEXT, location TEXT, category TEXT, time DATETIME)')


with sqlite3.connect('events.db') as connection:
    cursor = connection.cursor()

    create_table()


def addEvent(interest, name, location, category, time):
    newEvent = Event.createEvent(interest, name, category, location, time)
    cursor.execute('INSERT INTO events VALUES (?, ?, ?, ?, ?)', (newEvent.info, newEvent.name, newEvent.location, newEvent.category, newEvent.time))


def getEvents(category):
    events = []
    for row in cursor.execute('SELECT * FROM events WHERE name = ?', (category,)):
        events.append(Event(row[0], row[1], row[2], row[3], row[4]))
    return events 

def getTopTenEventsByDate():
    events = []
    for row in cursor.execute('SELECT * FROM events ORDER BY time DESC LIMIT 10'):
        events.append(Event(row[0], row[1], row[2], row[3], row[4]))
    return events
