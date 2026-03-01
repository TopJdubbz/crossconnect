import services.event_service as es
from models import event
from flask import Flask, jsonify, request
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

# Initialize database with sample events on startup
# (Assuming you built this function inside event_service.py)
#es.init_db()

@app.route('/addEvent', methods=['POST'])
def add_event():
    data = request.get_json()
    
    name = data.get('name')
    location = data.get('location')
    timedate = data.get('timedate')
    category = data.get('category')
    
    es.addEvent(name, location, category, timedate)
    
    return jsonify({"message": "Event added successfully"}), 201

@app.route('/getEvents', methods=['GET'])
def get_events():
    category = request.args.get('event_category') 
    
    events = es.getEvents(category)
    return jsonify(events), 200    

@app.route('/getUpcomingEvents', methods=['GET'])
def get_upcoming_events():
    events = es.getTopTenEventsByDate()
    return jsonify(events), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
