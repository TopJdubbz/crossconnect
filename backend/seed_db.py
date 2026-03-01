import os
import sqlite3
from datetime import datetime, timedelta

# Resolve DB path relative to backend folder (not cwd)
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BACKEND_DIR, 'events.db')

# Connect to database
connection = sqlite3.connect(DB_PATH)
cursor = connection.cursor()

# Sample events
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

# Insert sample events
for event in sample_events:
    cursor.execute('INSERT INTO events VALUES (?, ?, ?, ?)', event)

connection.commit()
print(f"✓ Inserted {len(sample_events)} sample events into the database")

# Display what was inserted
print("\nEvents in database:")
for row in cursor.execute('SELECT * FROM events'):
    print(f"  - {row[0]} ({row[2]}) at {row[1]} on {row[3]}")

connection.close()
