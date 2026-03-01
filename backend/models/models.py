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
