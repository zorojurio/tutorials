import pandas as pd
import os

print(os.getcwd()+ '/data.xlsx')


data = pd.read_excel('data.xlsx')


import googlemaps
API_key = 'AIzaSyBKiaXhaMhQnbyOB3rxlcSs4-NB9hK8Jlo' 
gmaps = googlemaps.Client(key=API_key)


origin = (-2.01234699405899,29.377851313693) #Let's say this is the origin
destinations = data.coordinates

actual_duration = []
actual_distance = []

for destination in destinations:
    result = gmaps.distance_matrix(origin, destination, mode='driving')["rows"][0]["elements"][0]
    duration_result= result["duration"]["value"]  
    duration_result = duration_result/3600
    actual_duration.append(duration_result)
    
    distance_result= result["distance"]["value"]  
    distance_result = distance_result/1000
    actual_distance.append(distance_result)
    
    #Add the list of coordinates to the main data set

data["duration (Hours)"] = actual_duration
data["distance (Km)"] = actual_distance


print(data.head(10))