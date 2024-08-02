from model import data, totalledCovidData

def lambda_handler(event, context):
    try:
        if event['headers']['switch']:
            requestedData=data.covidStatsByCountry(event['headers']['switch'])+totalledCovidData
    except:
        requestedData=data.start()

    return {
        'statusCode': 200,
        'body': requestedData
    }

#print(data.data[0].keys())
