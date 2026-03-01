class Location:
    #Edit this as we figure out google maps
    def __init__(self, address, lat, lng):
        self.address = address
        self.lat = lat
        self.lngitude = lng

    @classmethod
    def createLocation(cls, address, lat, lng):
        return cls(address, lat, lng)

class Event:
    def __init__(self, interest, name, location, timedate):
        self.interest = interest
        self.name = name
        #Edit location as we change location
        self.location = location
        self.timedate = timedate
        #self.capacity = capacity
    
    @classmethod
    def createEvent(cls, interest, name, location, timedate):
        return cls(interest, name, location, timedate)
