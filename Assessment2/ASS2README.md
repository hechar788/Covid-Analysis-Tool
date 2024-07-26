Real-time Covid-19 data visualization using 3d model rendering 

Current Tech Stack 
 - vite, javascript, 3js, react?, python
 - host through AWS S3 static hosting for the frontend and pythonanywhere.com to handle running the python scripts rather then AW$$$$

24 July 2024 - Initial commit
 - found 2 reliable sources of data for this assignment.
    - Real-Time Covid Data - https://www.worldometers.info/coronavirus/#countries
    - Country Geolocation Data - https://developers.google.com/public-data/docs/canonical/countries_csv
  - Created Beautiful Soup HTML parsing script in python to scrape the data from the websites above and converted the data into valid, ordered JSON objects

24 July 2024 - Second commit
 - Optomized Soup scripts to properly match the original tables structure which will allow the data to be handled properly by the frontend/db

25 July 2024 - Third commit
 - Created a basic Flask API. This will be used by the frontend to fetch the covid/country data
 - Currently it is being developed on localhost but after synchronizing the two datasets it will be pushed to pythonanywhere.com

25 July 2024 - Forth commit
 - Synchronized data aggregation script into 1 centralized script with a function to traverse the parsed html
 - This significantly reduced the amount of repeated code and allowed me to centralize the imports from my model as well as prepare for joining of the datasets

 
Currently working on 
 - Developing 3d earth model in javascript and mapping countries long/lat to the model 
