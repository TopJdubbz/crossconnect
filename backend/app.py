from Flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello from the backend!',
        'items': [1, 2, 3, 4, 5]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

class Interest:
    def __init__(self, type):
        self.type = type

class address:
    def __init__(self, number, street, city, state):
        self.number = number
        self.street = street
        self.city = city
        self.state = state

class location:
    #Edit this as we figure out google maps
    def __init__(self, zipCode, address):
        self.zipCode = zipCode
        self.address = address(number,street, city, state)
        self.longitude = longitude
        self.latitude = latitude

class date:
    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year


class Event:
    def __init__(self, name, date, location):
        self.interest = name
        #Edit location as we change location
        self.location = location
        self.date = date(day, month, year)
        #self.capacity = capacity
        self.time = time


# Make a class of events
# Make a class of dashboard
# Make a class of interest its a type

