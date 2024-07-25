from bs4 import BeautifulSoup
import requests

urls = ['https://developers.google.com/public-data/docs/canonical/countries_csv', 'https://www.worldometers.info/coronavirus/#countries' ]
parsedHTML = [BeautifulSoup(requests.get(x).text, 'html.parser') for x in urls]

country_table = parsedHTML[0].find('table')
covid_table = parsedHTML[1].find('tbody')


def extractCellInformationFromTable(table, tableNum=0):
    table_data = []
    for row in table.findAll('tr'):
        row_data = [cell.text for cell in row.findAll('td')]
        
        if row_data:
            if tableNum:
                table_data.append({'countryID': row_data[0], 'lat': row_data[1], 'long': row_data[2], 'country': row_data[3]})
                continue
            table_data.append({
                "id": row_data[0],
                "country": row_data[1],
                "totalCases": row_data[2],
                "newCases": row_data[3],
                "totalDeaths": row_data[4],
                "newDeaths": row_data[5],
                "totalRecovered": row_data[6],
                "activeCases": row_data[7],
                "criticalCases": row_data[8],
                "totCase1M": row_data[9],
                "totDeath1M": row_data[10],
                "totalTests": row_data[11],
                "totTest1M": row_data[12]
            })
            
    return table_data[8:] if not tableNum else table_data


sortedCountryData = sorted(extractCellInformationFromTable(country_table, 1), key=lambda d: d['country'])
sortedCovidData = sorted(extractCellInformationFromTable(covid_table), key=lambda d: d['country'])

synchronizedCountryCovidData = 'coming soon'