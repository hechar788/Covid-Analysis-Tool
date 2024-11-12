import json
from controller import covidStats

def lambda_handler(event, context):
    targetCountries = event.get('targetCountries', [])
    targetDates = event.get('targetDates', [])
    
    result = covidStats(targetCountries, targetDates)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }