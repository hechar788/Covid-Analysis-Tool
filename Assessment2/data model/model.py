from bs4 import BeautifulSoup
import requests
import json

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
        return json.dumps({'countryData': {x['country']: [x['lat'], x['long']] for x in self.data}, 'covidTotals': totalledCovidData})
    
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