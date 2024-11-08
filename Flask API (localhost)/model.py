from data_aggregation_script import synchronizedCountryCovidData

def covidStatsByDate(targetDate):
    '''
    #print(data.covidStatsByDate('2024-07-12'))
    '''
    return [(x['country'], x['gdp_per_capita'], x['population'], x['life_expectancy'], x['hospital_beds_per_thousand'], x['handwashing_facilities'], i) for x in synchronizedCountryCovidData for i in x['data'] if i['date'] == targetDate]


def covidStatsByCountryAndDate(targetDate, targetCountry):
    '''
    #print(data.covidStatsByCountryAndDate('2024-07-12', 'New Zealand'))
    '''
    return [(x['country'], x['gdp_per_capita'], x['population'], x['life_expectancy'], x['hospital_beds_per_thousand'], x['handwashing_facilities'], i) for x in synchronizedCountryCovidData for i in x['data'] if i['date'] == targetDate and x['country'] == targetCountry]


def covidStatsByDateRange(min, max):
    result = []
    
    for x in synchronizedCountryCovidData:
        filtered_data = [i for i in x['data'] if min <= i['date'] <= max]
        
        if filtered_data:
            # Create a new dictionary containing the filtered data
            country_data = x.copy()
            country_data['data'] = filtered_data
            result.append(country_data)
    
    return result


def covidStatsByCountryAndDateRange(min, max, targetCountry):
        '''
        #print(data.covidStatsByCountryAndDateRange('2024-07-12', '2024-07-21', 'New Zealand'))
        '''
        return [(x['country'], x['gdp_per_capita'], x['population'], x['life_expectancy'], x['hospital_beds_per_thousand'], x['handwashing_facilities'], i) for x in synchronizedCountryCovidData for i in x['data'] if (min <= i['date'] <= max) and x['country'] == targetCountry]