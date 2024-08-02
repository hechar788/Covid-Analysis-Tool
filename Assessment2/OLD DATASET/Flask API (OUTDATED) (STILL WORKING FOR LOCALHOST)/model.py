from bs4 import BeautifulSoup
import requests

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
            table_data.append(row_data)
     
    return table_data[-1] if not tableNum else table_data


sortedCountryData = sorted(extractCellInformationFromTable(country_table, 1), key=lambda d: d['country'])
sortedCovidData = extractCellInformationFromTable(covid_table)

synchronizedCountryCovidData = []
missingCountries = []

# covidDataMap = {entry['country']: entry for entry in sortedCovidData}

# for country in sortedCountryData:
#     if country['country'] in covidDataMap:
#         joined_data = {**country, **covidDataMap[country['country']]}
#         synchronizedCountryCovidData.append(joined_data)
#     else:
#         missingCountries.append(country)

print(sortedCovidData)
