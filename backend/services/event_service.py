import os
import sqlite3
import threading
from datetime import datetime, timedelta
from models import event
try:
    import osmnx as ox
    HAS_OSMNX = True
except ImportError:
    HAS_OSMNX = False
    ox = None
import random
import time

REAL_COORDS = {}

# Resolve DB path relative to backend folder (not cwd)
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BACKEND_DIR, 'events.db')

# Create the global connection with the thread safety flag
connection = sqlite3.connect(DB_PATH, check_same_thread=False)
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

def build_coordinate_cache():
    
    cursor.execute('SELECT DISTINCT location FROM events')
    unique_locations = cursor.fetchall()
    
    if not HAS_OSMNX:
        print("OSMnx not available, skipping geocoding.")
        return
    for row in unique_locations:
        address = row[0]
        try:
            coords = ox.geocode(address)
            REAL_COORDS[address] = coords
            print(f"✓ Mapped: {address}")
        except Exception as e:
            print(f"✗ Failed to map: {address}")
            
        
        
    print("Coordinate cache built successfully! Server ready.")

def init_db():
    """Initialize database with sample events if empty"""
    try:
        cursor.execute('SELECT COUNT(*) FROM events')
        count = cursor.fetchone()[0]
        
        if count == 0:
            sample_events = [
                # Technology
                ("AI & Machine Learning Summit", "1 Washington Sq, San Jose, CA 95192", "Technology", datetime.now() + timedelta(days=2)),
                ("Silicon Valley Startup Mixer", "10600 N Tantau Ave, Cupertino, CA 95014", "Technology", datetime.now() + timedelta(days=6)),
                ("Cybersecurity Bootcamp", "21250 Stevens Creek Blvd, Cupertino, CA 95014", "Technology", datetime.now() + timedelta(days=12)),
                
                # Sports
                ("Sharks vs. Kings Hockey Game", "525 W Santa Clara St, San Jose, CA 95113", "Sports", datetime.now() + timedelta(days=3)),
                ("49ers Preseason Tailgate", "4900 Marie P DeBartolo Way, Santa Clara, CA 95054", "Sports", datetime.now() + timedelta(days=9)),
                ("Amateur Chess Tournament", "500 El Camino Real, Santa Clara, CA 95053", "Sports", datetime.now() + timedelta(days=5)),
                
                # Culture
                ("Armenian Heritage Festival", "10800 Torre Ave, Cupertino, CA 95014", "Culture", datetime.now() + timedelta(days=1)),
                ("Downtown Art Walk", "377 Santana Row, San Jose, CA 95128", "Culture", datetime.now() + timedelta(days=4)),
                ("International Food Festival", "5001 Great America Pkwy, Santa Clara, CA 95054", "Culture", datetime.now() + timedelta(days=15)),
                
                # Political
                ("City Council Townhall", "200 E Santa Clara St, San Jose, CA 95113", "Political", datetime.now() + timedelta(days=7)),
                ("Mayoral Debate 2026", "500 Castro St, Mountain View, CA 94041", "Political", datetime.now() + timedelta(days=14)),
                
                # Education
                ("Robotics for Beginners Workshop", "1401 N Shoreline Blvd, Mountain View, CA 94043", "Education", datetime.now() + timedelta(days=10)),
                ("Local History Lecture", "500 El Camino Real, Santa Clara, CA 95053", "Education", datetime.now() + timedelta(days=8)),
                ("Open Source Software Meetup", "1600 Amphitheatre Pkwy, Mountain View, CA 94043", "Education", datetime.now() + timedelta(days=11)),
                
                # Health
                ("Community Wellness Fair", "701 S Bascom Ave, San Jose, CA 95128", "Health", datetime.now() + timedelta(days=8)),
                ("Morning Yoga in the Park", "10185 N Stelling Rd, Cupertino, CA 95014", "Health", datetime.now() + timedelta(days=1)),
                ("5K Charity Run", "1000 W Hedding St, San Jose, CA 95126", "Health", datetime.now() + timedelta(days=20)),
                
                # Entertainment
                ("Outdoor Summer Concert", "One Amphitheatre Pkwy, Mountain View, CA 94043", "Entertainment", datetime.now() + timedelta(days=4)),
                ("Stand-up Comedy Night", "150 S 1st St, San Jose, CA 95113", "Entertainment", datetime.now() + timedelta(days=2)),
                ("Broadway in San Jose: Aladdin", "255 Almaden Blvd, San Jose, CA 95113", "Entertainment", datetime.now() + timedelta(days=18)),
            ]
            
            for event in sample_events:
                cursor.execute('INSERT INTO events (name, location, category, time) VALUES (?, ?, ?, ?)', event)
            
            connection.commit()

            
            print(f"✓ Database initialized with {len(sample_events)} sample events")
    except Exception as e:
        print(f"Error initializing database: {e}")
    # Run geocoding in background so server starts immediately
    threading.Thread(target=build_coordinate_cache, daemon=True).start()

def addEvent(name, location, category, event_time):
    formatted_time = str(event_time).replace('T', ' ')
    
    if HAS_OSMNX:
        try:
            new_coords = ox.geocode(location)
            REAL_COORDS[location] = new_coords
        except Exception:
            pass

    cursor.execute(
        'INSERT INTO events (name, location, category, time) VALUES (?, ?, ?, ?)', 
        (name, location, category, formatted_time)
    )
    connection.commit()
    
    return True

# Fetch events by category, in find section
def getEvents(category):
    events = []
    search_term = f"{category}%" 
    
    for row in cursor.execute('SELECT * FROM events WHERE category LIKE ?', (search_term,)):
        coords = getCoord(row[2])
        
        calculated_lat = coords[0] if coords else None
        calculated_lng = coords[1] if coords else None
        
        events.append({
            "id": row[0],
            "name": row[1],
            "location": row[2],
            "interest": row[3],
            "timedate": row[4],
            "lat": calculated_lat,
            "lng": calculated_lng
        })
        
    return events



def getTopTenEventsByDate():
    events = []
    for row in cursor.execute('SELECT * FROM events ORDER BY time LIMIT 10'):

        coords = getCoord(row[2])
        
        calculated_lat = coords[0] if coords else None
        calculated_lng = coords[1] if coords else None
        
        events.append({
            "id": row[0], 
            "name": row[1],
            "location": row[2],
            "category": row[3],
            "time": row[4],
            "lat": calculated_lat, 
            "lng": calculated_lng  
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
    if myAddr in REAL_COORDS:
        return REAL_COORDS[myAddr] # Returns (lat, lng) perfectly

