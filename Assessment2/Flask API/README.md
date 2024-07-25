Flask API which will be hosted on pythonanywhere.com

Run main.py, access on localhost:80

See 'views.py' for routes which return data related to /covid or /country

The data is produced by polling a large real-time covid dataset, the covid data will be mapped to the country geolocation data to be mapped accordingly on the interactive 3d model

Frontend is JS and will fetch() from pythonanywhere.com
 - need to support cors