from flask import request, jsonify, Blueprint
from data_aggregation_script import synchronizedCountryCovidData, totalledCovidData
from model import covidStatsByCountryAndDate, covidStatsByCountryAndDateRange, covidStatsByDate, covidStatsByDateRange

views = Blueprint(__name__, 'views')

@views.route('/')
def home():
    return '''
    This is the Flask Web-API which manages the collection and covid/country data preparation for my project
        <br><br>
        <a href="/covid">Covid Stats</a><br>
        <a href="/country">Countries</a>
'''

# @views.route('/covid')
# def covid():
#     return totalledCovidData

# @views.route('/country')
# def country():
#     return [[x['country'], float(x['lat']), float(x['long'])]  for x in synchronizedCountryCovidData]

# @views.route('/synchronized')
# def synchronized():
#     return synchronizedCountryCovidData

# @views.route('/single/<targetCountry>')
# def covidStatsByCountry(targetCountry):
#     '''Returns list of objects containing data related to all covid statistics for the targetCountry
#     Object keys: 'date', 'total_cases', 'new_cases', 'new_cases_smoothed', 'total_deaths', 'new_deaths', 'new_deaths_smoothed', 'total_cases_per_million', 'new_cases_per_million', 'new_cases_smoothed_per_million', 'total_deaths_per_million', 'new_deaths_per_million', 'new_deaths_smoothed_per_million', 'new_vaccinations_smoothed', 'new_vaccinations_smoothed_per_million'
#     #print([[type(x['data']), len(x['data'])] for x in self.data if x['country'] == targetCountry]) -- type <list>, length 1640
#     '''
#     for x in synchronizedCountryCovidData:
#         if x['country'] == targetCountry:
#             return x

@views.route('/multiple', methods=['POST', 'GET'])
def covidStatsByCountries():
    '''Returns list of objects containing data related to all covid statistics for the targetCountry
    Object keys: 'date', 'total_cases', 'new_cases', 'new_cases_smoothed', 'total_deaths', 'new_deaths', 'new_deaths_smoothed', 'total_cases_per_million', 'new_cases_per_million', 'new_cases_smoothed_per_million', 'total_deaths_per_million', 'new_deaths_per_million', 'new_deaths_smoothed_per_million', 'new_vaccinations_smoothed', 'new_vaccinations_smoothed_per_million'
    #print([[type(x['data']), len(x['data'])] for x in self.data if x['country'] == targetCountry]) -- type <list>, length 1640
    '''
    targetCountries = request.json.get('targetCountries', [])
    targetDates = request.json.get('targetDates', [])
    print(targetCountries)
    print(targetDates)

    if len(targetDates) == 2:
        data = covidStatsByDateRange(targetDates[0], targetDates[1])
    else: 
        data = synchronizedCountryCovidData

    full_countries = []
    for x in targetCountries:
        for i in data:
            if x['name'] == i['country']:
                full_countries.append(i)
    return jsonify(full_countries)
