class Event:
    def __init__(self, name, date, location, time):
        self.name = name
        #Edit location as we change location
        self.location = location
        self.date = date
        #self.capacity = capacity
        self.time = time