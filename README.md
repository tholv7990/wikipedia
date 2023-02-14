High level plan to implement the challenge: 

1. Use the Angular framework to create the application.
2. Use an HTTP client to fetch the HTML content of the Wikipedia page.
3. Use a proxy server to bypass the CORS problem.
4. Use a library such as cheerio.js to parse the HTML content and extract the table data.
5. Use the extracted data to create a graph using a charting library such as Chart.js.
6. Convert the chart to file image and save it using file-saver
7. Implement tests using a testing framework such as Jasmine or Karma to ensure the application is working correctly and meets the requirements.

To run project we need to run the command below:
1. npm install (this will install all the need dependencies)
2. npm run serve (or ng serve)