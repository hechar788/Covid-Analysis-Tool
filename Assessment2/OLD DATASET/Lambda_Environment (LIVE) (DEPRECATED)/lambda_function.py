from model import synchronizedCountryCovidData, sortedCovidData, sortedCountryData


def lambda_handler(event, context):
    print(event)
    requestedData=synchronizedCountryCovidData
    return {
        'statusCode': 200,
        'body': requestedData
    }
