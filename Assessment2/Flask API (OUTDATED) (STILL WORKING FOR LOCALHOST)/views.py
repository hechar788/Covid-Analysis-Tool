from flask import Blueprint
from model import synchronizedCountryCovidData, sortedCovidData, sortedCountryData

views = Blueprint(__name__, 'views')

@views.route('/')
def home():
    return '''
    This is the Flask Web-API which manages the collection and covid/country data preparation for my project
        <br><br>
        <a href="/covid">Covid Stats</a><br>
        <a href="/country">Countries</a>
'''

@views.route('/covid')
def covid():
    return sortedCovidData

@views.route('/country')
def country():
    return sortedCountryData

@views.route('/synchronized')
def synchronized():
    return synchronizedCountryCovidData