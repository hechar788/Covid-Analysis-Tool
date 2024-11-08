from bs4 import BeautifulSoup
import requests
import json

#
# Initializing Datasets 1&2 which contain information regarding every countries long/lat and real-time covid totals for the earth
#

urls = ['https://developers.google.com/public-data/docs/canonical/countries_csv', 'https://www.worldometers.info/coronavirus/' ]
parsedHTML = [BeautifulSoup(requests.get(x).text, 'html.parser') for x in urls]
country_table = parsedHTML[0].find('table')
covid_table = parsedHTML[1].find('table')

def extractCellInformationFromTable(table, tableNum=0):
    table_data = []
    for row in table.findAll('tr'):
        row_data = [cell.text for cell in row.findAll('td')]
        
        if row_data:
            if tableNum:
                table_data.append({'countryID': row_data[0], 'lat': row_data[1], 'long': row_data[2], 'country': row_data[3]})
                continue
            table_data.append({
                'totalCases': row_data[2],
                'newCases': row_data[3],
                'totalDeaths': row_data[4],
                'newDeaths': row_data[5],
                'totalRecovered': row_data[6],
                'newRecovered': row_data[7],
                'activeCases': row_data[8],
                'seriousCriticalCases': row_data[9]

            })
     
    return table_data[-1] if not tableNum else table_data

sortedCountryData = sorted(extractCellInformationFromTable(country_table, 1), key=lambda d: d['country'])
totalledCovidData = extractCellInformationFromTable(covid_table)


#
# Initializing Dataset#3 with desired object keys
# - keys for data converted to the 'location' as it maps better to the other dataset, originally the keys were ISO code

with open('owid-covid-data.json') as f:
    #print(data['NZL']['location'], data['NZL']['data'][0])
    data = json.load(f)
    keys = data.keys() 
    
    covid_data = {entry['location']: entry for entry in data.values()}
    #print(covid_data.keys(), '\n', data.keys())


#
# Mapping Datasets together on country key
#

synchronizedCountryCovidData = []
missingCountries = []
for country in sortedCountryData:
    if country['country'] in covid_data:
        joined_data = {**country, **covid_data[country['country']]}
        synchronizedCountryCovidData.append(joined_data)
    else:
        missingCountries.append(country)