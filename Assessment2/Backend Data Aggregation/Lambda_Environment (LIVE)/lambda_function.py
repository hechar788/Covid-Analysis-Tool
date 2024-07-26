from model import synchronizedCountryCovidData, sortedCovidData, sortedCountryData

# sortedCovidData & sortedCountryData - 2 datasets collected from html parsing
# the synchronizedCountryCovidData is the 2 datasets mapped together on their country key

#print(synchronizedCountryCovidData)

def lambda_handler(event, context):
    print(event)
    requestedData=synchronizedCountryCovidData
    return {
        'statusCode': 200,
        'body': requestedData
    }
