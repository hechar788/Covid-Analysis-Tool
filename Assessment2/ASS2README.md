Real-time Covid-19 data visualization using 3d model rendering 

Current Tech Stack - vite, javascript, 3js, python
Will host through AWS S3 static hosting for the javascript/3js/react? frontend and pythonanywhere.com to handle running the python scripts rather then AW$$$$

24 July 2024 - Initial commit
 - found 2 reliable sources of data for this assignment.
    - Real-Time Covid Data - https://www.worldometers.info/coronavirus/#countries
    - Country Geolocation Data - https://developers.google.com/public-data/docs/canonical/countries_csv
  - Created Beautiful Soup HTML parsing script in python to scrape the data from the websites above and converted the data into valid, ordered JSON objects


Currently working on 
 - Restructure JSON objects created by Soup scripts to be appropriate for consumption by the view/model
 - Developing 3d earth model in javascript and mapping countries long/lat to the model 
