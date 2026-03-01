import sqlite3
from datetime import datetime, timedelta

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

def getEvents(category):
    events = []
    for row in cursor.execute('SELECT * FROM events WHERE category = ?', (category,)):
        events.append({
            "id": row[0],
            "name": row[1],
            "location": row[2],
            "category": row[3],
            "time": row[4]
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