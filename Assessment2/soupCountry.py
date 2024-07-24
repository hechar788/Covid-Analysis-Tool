from bs4 import BeautifulSoup
import requests

webText = requests.get('https://developers.google.com/public-data/docs/canonical/countries_csv').text
soup = BeautifulSoup(webText, 'html.parser')

table = soup.find('table')

table_data = []
for row in table.findAll('tr'):
    row_data = [cell.text for cell in row.findAll('td')]
    if(row_data):
        table_data.append({'countryID': row_data[0], 'lat': row_data[1], 'long': row_data[2], 'country': row_data[3]})

print(sorted(table_data, key=lambda d: d['country']))