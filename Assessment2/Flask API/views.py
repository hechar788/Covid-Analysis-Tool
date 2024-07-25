from flask import Blueprint
from CountryData import sortedCountryData
from CovidData import sortedCovidData

views = Blueprint(__name__, 'views')

@views.route('/')
def home():
    return 'This is the Flask Web-API which manages the collection and covid/country data preparation for my project'

@views.route('/covid')
def covid():
    return sortedCovidData

@views.route('/country')
def country():
    return sortedCountryData