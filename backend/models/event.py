class Event:
    def __init__(self, interest, name, date, location, time):
        self.interest = interest
        self.name = name
        #Edit location as we change location
        self.location = location
        self.date = date
        #self.capacity = capacity
        self.time = time
    
    @classmethod
    def createEvent(cls, interest, name, date, location, time):
        return cls(interest, name, date, location, time)
