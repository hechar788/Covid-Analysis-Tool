from datetime import timedelta
from dateutil import parser
from data_initialization_script import covid_data

def convert_iso_date_to_simple_date(isoDateString):
    # Parse the ISO date string into a datetime object
    dt = parser.isoparse(isoDateString)
    adjusted_date = dt.date() + timedelta(days=1)
    # Return 'YYYY-MM-DD' format
    return adjusted_date.isoformat()

def covidStatsByDate(targetDate):
    '''
    #print(data.covidStatsByDate('2024-07-12'))
    '''
    targetDate = convert_iso_date_to_simple_date(targetDate)
    result = []
    for x in covid_data:
        filtered_data = [i for i in x['data'] if i['date'] == targetDate]
        if filtered_data:
            country_data = x.copy()
            country_data['data'] = filtered_data
            result.append(country_data)
    return result

def covidStatsByDateRange(min, max):
    result = []
    for x in covid_data:
        filtered_data = [i for i in x['data'] if min <= i['date'] <= max]
        
        if filtered_data:
            country_data = x.copy()
            country_data['data'] = filtered_data
            result.append(country_data)
    return result


# def covidStatsByCountryAndDate(targetDate, targetCountry):
#     '''
#     #print(data.covidStatsByCountryAndDate('2024-07-12', 'New Zealand'))
#     '''
#     return [(x['country'], x['gdp_per_capita'], x['population'], x['life_expectancy'], x['hospital_beds_per_thousand'], x['handwashing_facilities'], i) for x in covid_data for i in x['data'] if i['date'] == targetDate and x['country'] == targetCountry]


# def covidStatsByCountryAndDateRange(min, max, targetCountry):
#         '''
#         #print(data.covidStatsByCountryAndDateRange('2024-07-12', '2024-07-21', 'New Zealand'))
#         '''
#         return [(x['country'], x['gdp_per_capita'], x['population'], x['life_expectancy'], x['hospital_beds_per_thousand'], x['handwashing_facilities'], i) for x in covid_data for i in x['data'] if (min <= i['date'] <= max) and x['country'] == targetCountry]