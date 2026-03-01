import sqlite3
from datetime import datetime, timedelta
from models import event
import osmnx as ox

# Create the global connection with the thread safety flag 
connection = sqlite3.connect('events.db', check_same_thread=False)
cursor = connection.cursor()

def create_table():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            location TEXT, 
            category TEXT, 
            time DATETIME
        )
    ''')
    connection.commit()

create_table()

def init_db():
    """Initialize database with sample events if empty"""
    try:
        cursor.execute('SELECT COUNT(*) FROM events')
        count = cursor.fetchone()[0]
        
        if count == 0:
            sample_events = [
                ("Tech Meetup", "Downtown Coffee Shop", "Technology", datetime.now() + timedelta(days=2)),
                ("Community Cleanup", "Central Park", "Community", datetime.now() + timedelta(days=5)),
                ("Yoga Class", "Wellness Center", "Health", datetime.now() + timedelta(days=1)),
                ("Book Club", "Library", "Entertainment", datetime.now() + timedelta(days=7)),
                ("Networking Event", "Business District", "Business", datetime.now() + timedelta(days=3)),
                ("Art Exhibition", "Gallery Downtown", "Art", datetime.now() + timedelta(days=10)),
                ("Sports Tournament", "City Stadium", "Sports", datetime.now() + timedelta(days=14)),
                ("Music Festival", "Central Venue", "Entertainment", datetime.now() + timedelta(days=21)),
                ("Coding Workshop", "Tech Hub", "Technology", datetime.now() + timedelta(days=4)),
                ("Charity Run", "Riverside Park", "Community", datetime.now() + timedelta(days=6)),
            ]
            
            for event in sample_events:
                cursor.execute('INSERT INTO events (name, location, category, time) VALUES (?, ?, ?, ?)', event)
            
            connection.commit()
            print(f"✓ Database initialized with {len(sample_events)} sample events")
    except Exception as e:
        print(f"Error initializing database: {e}")

def addEvent(name, location, category, time):
    cursor.execute('INSERT INTO events (name, location, category, time) VALUES (?, ?, ?, ?)', (name, location, category, time))
    connection.commit() 

# Fetch events by category, in find section
def getEvents(category):
    events = []
    for row in cursor.execute('SELECT * FROM events WHERE category LIKE ?', (category,)):
        #make get coords only take the addy
        coords = getCoord(row[2])
        row[5] = coords[1] if coords else None
        row[6] = coords[0]
        #This gets sent to find.jsx. 
        events.append({
            "id": row[0],
            "name": row[1],
            "location": row[2],
            "interest": row[3],
            "timedate": row[4],
            "lat": row[5],
            "lng": row[6]
        })
    return events 



def getTopTenEventsByDate():
    events = []
    for row in cursor.execute('SELECT * FROM events ORDER BY time LIMIT 10'):
        events.append({
            "id": row[0], 
            "name": row[1],
            "location": row[2],
            "category": row[3],
            "time": row[4]
        })
    return events


#Takes events from getEvents and stores a list of event objects, to be used for map and more.
def makeEventObjList(events):
    eventObjs = []
    for e in events:
        eventObj = event.Event(e['category'], e['name'], e['location'], e['time'])
        eventObjs.append(eventObj)
    return eventObjs

#def getAddres(event):
   # location = event.location
   # return location

def getCoord(myAddr):
    coord = ox.geocode(myAddr)
    return coord

