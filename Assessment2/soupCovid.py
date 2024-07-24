import requests
from bs4 import BeautifulSoup
url = 'https://www.worldometers.info/coronavirus/#countries' 

website_content = requests.get(url).text
soup = BeautifulSoup(website_content,'html.parser')

table = soup.find('tbody')

table_data = []
new_cases_data = []
for row in table.findAll('tr'):
    row_data = [cell.text for cell in row.findAll('td')]
    if(row_data):
        data_item = {"id": row_data[0],
                     "country": row_data[1],
                     "totalCases": row_data[2],
                     "newCases": row_data[3],
                     "totalDeaths": row_data[4],
                     "newDeaths": row_data[4],
                     "totalRecovered": row_data[6],
                     "activeCases": row_data[7],
                     "criticalCases": row_data[8],
                     "totCase1M": row_data[9],
                     "totDeath1M": row_data[10],
                     "totalTests": row_data[11],
                     "totTest1M": row_data[12]
                    }
        new_cases_data.append(row_data[6])
        table_data.append(data_item)

sortedCovidData = sorted([{'id': x['id'], 'country': x['country'], 'totalCases': x['totalCases']} for x in table_data[8:]], key=lambda d: d['country'])
print(sortedCovidData)