from data_initialization_script import covid_data
from model import covidStatsByDate, covidStatsByDateRange

def covidStats(targetCountries, targetDates):
    '''Returns list of objects containing data related to all covid statistics for the targetCountry
    Object keys: 'date', 'total_cases', 'new_cases', 'new_cases_smoothed', 'total_deaths', 'new_deaths', 'new_deaths_smoothed', 'total_cases_per_million', 'new_cases_per_million', 'new_cases_smoothed_per_million', 'total_deaths_per_million', 'new_deaths_per_million', 'new_deaths_smoothed_per_million', 'new_vaccinations_smoothed', 'new_vaccinations_smoothed_per_million'
    #print([[type(x['data']), len(x['data'])] for x in self.data if x['country'] == targetCountry]) -- type <list>, length 1640
    '''
    if not targetCountries:
        return []
    
    if len(targetDates) == 2:
        data = covidStatsByDateRange(targetDates[0], targetDates[1])
    elif len(targetDates) == 1:
        data = covidStatsByDate(targetDates[0])
    else: 
        data = covid_data
    
    full_countries = []
    for country in targetCountries:
        if country['name'] in data:
            full_countries.append(data[country['name']])

    return full_countries