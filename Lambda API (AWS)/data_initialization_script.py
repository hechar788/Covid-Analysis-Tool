import json

#
# Initializing dataset with desired object keys
# - keys for data converted to the 'location' as it maps better to the other dataset, originally the keys were ISO code

with open('owid-covid-data.json') as f:
    #print(data['NZL']['location'], data['NZL']['data'][0])

    data = json.load(f)    
    covid_data = {entry['location']: entry for entry in data.values()}
    
    #print(covid_data.keys(), '\n', data.keys())
