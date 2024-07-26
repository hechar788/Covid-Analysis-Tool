Real-time Covid-19 data visualization using 3d model rendering 

Current Tech Stack 
 - vite, javascript, 3js, react?, python
 - host through AWS S3 static hosting for the frontend and pythonanywhere.com to handle running the python scripts rather then AW$$$$



24 July 2024 - Mani Initial commit
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



26 July 2026 - Fifth commit  
 - Joined datasets together on their matching country keys, data has been turned into a Flask API which will be attempted to be hosted on pythonanywhere.com
 - API is ready to be moved to a cloud work-load

26 July 2026 - Branch AWS-LAMBDA-HOSTED-WEBDATA.. created - First Commit
  - Moving the workload to pythonanywhere.com went terribly, firstly the free tier was not enough to accomodate the cpu usage of the application for
    parsing the HTML. Secondly pythonanywhere.com has whitelisted only certain APIs for requesting data through python. This was blocking me from accessing the datasets
    which was not happen when the app was run locally.

  - After emailing support, I decided to move the workload to AWS Lambda and use a serverless architecture for handling the data aggregation.
    Reformatting the code into a serverless comptible format was quick, and the Lambda function was enabled with an HTTP endpoint which allows for it to be
    effectively called from the frontend and return data based on the event. I also spent some time making sure that all the dependencies for the libraries I am actually using were minimal and not included if not being used by the application.

  - This change has been extremely effective and cut down on all of the bulky Flask application and run more efficient, thin workloads for the model. 
    For testing, this fits well withing the free tier of Amazon Web Services.

Currently working on 
 - Developing 3d earth model in javascript and mapping countries long/lat to the model 
