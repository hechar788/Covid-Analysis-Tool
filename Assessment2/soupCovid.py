import requests
from bs4 import BeautifulSoup
url = 'https://www.worldometers.info/coronavirus/#countries' 

website_content = requests.get(url).text
soup = BeautifulSoup(website_content,'html.parser')

table = soup.find('tbody')

table_data = []
for row in table.findAll('tr'):
    row_data = [cell.text for cell in row.findAll('td')]
    if(row_data):
        print(len(row_data)) 
        data_item = {"id": row_data[0],
                     "country": row_data[1],
                     "totalCases": row_data[2],
                     "newCases": row_data[3],
                     "totalDeaths": row_data[4],
                     "TotalRecovered": row_data[5],
                     "ActiveCases": row_data[6],
                     "CriticalCases": row_data[7],
                     "Totcase1M": row_data[8],
                     "Totdeath1M": row_data[9],
                     "TotalTests": row_data[10],
                     "Tottest1M": row_data[11]
                    }
        table_data.append(data_item)

valid_data = [{'id': x['id'], 'country': x['country']} for x in table_data[8:]]
sortedCovidData = sorted(valid_data, key=lambda d: d['country'])
print(sortedCovidData)