from model import data

def lambda_handler(event, context):
    try:
        if event['headers']['switch']:
            requestedData=data.covidStatsByCountry(event['headers']['switch'])
    except:
        requestedData=data.start()

    return {
        'statusCode': 200,
        'body': requestedData
}