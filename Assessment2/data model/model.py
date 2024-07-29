from bs4 import BeautifulSoup
import requests
import json

def extractCellInformationFromTable(table):
    '''used to extract cell information from a parsed html table, returns a list so that it may be mapped with 
     the other dataset effectively'''
    table_data = []
    for row in table.findAll('tr'):
        row_data = [cell.text for cell in row.findAll('td')]
        if row_data:
            table_data.append({'countryID': row_data[0], 'lat': row_data[1], 'long': row_data[2], 'country': row_data[3]})
    return table_data

url = 'https://developers.google.com/public-data/docs/canonical/countries_csv'
parsedHTML = BeautifulSoup(requests.get(url).text, 'html.parser')
sortedCountryData = sorted(extractCellInformationFromTable(parsedHTML.find('table')), key=lambda d: d['country'])

 
with open('owid-covid-data.json') as f:
    #print(data['NZL']['location'], data['NZL']['data'][0])
    data = json.load(f)
    keys = data.keys() 
    
    #keys for data converted to the 'location' as it maps better to the other dataset
    covid_data = {entry['location']: entry for entry in data.values()}
    #print(covid_data.keys(), '\n', data.keys())

synchronizedCountryCovidData = []
missingCountries = []

for country in sortedCountryData:
    if country['country'] in covid_data:
        joined_data = {**country, **covid_data[country['country']]}
        synchronizedCountryCovidData.append(joined_data)
    else:
        missingCountries.append(country)


class DataStream:
    def __init__(self):
        self.data = synchronizedCountryCovidData

    def start(self):
        return {x['country']: [x['lat'], x['long']] for x in self.data}
    
    def covidStatsByCountry(self, targetCountry):
        '''Returns list of objects containing data related to all covid statistics for the targetCountry
        Object keys: 'date', 'total_cases', 'new_cases', 'new_cases_smoothed', 'total_deaths', 'new_deaths', 'new_deaths_smoothed', 'total_cases_per_million', 'new_cases_per_million', 'new_cases_smoothed_per_million', 'total_deaths_per_million', 'new_deaths_per_million', 'new_deaths_smoothed_per_million', 'new_vaccinations_smoothed', 'new_vaccinations_smoothed_per_million'
        #print([[type(x['data']), len(x['data'])] for x in self.data if x['country'] == targetCountry]) -- type <list>, length 1640
        '''
        for x in self.data:
            if x['country'] == targetCountry:
                return x['data']

data = DataStream()

# IMPORT data INTO FRONTEND PROJECT AND USE data.start() / data.covidStatsByCountry(<insert-target-country-string>)