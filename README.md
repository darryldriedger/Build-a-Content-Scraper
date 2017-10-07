## Build a Content Scraper - - Treehouse tech degree project 6

## Requirements

- [X] Create a scraper.js and package.json file.

- [X] NPM install command should install all your dependencies.

- [X] The scraper should generate a folder called data if it doesn’t exist and do nothing if it does.

- [X] The information from the site should be stored in a CSV file with today’s date e.g. 2016-01-29.csv.

- [X] Use a third party npm package to scrape content from the site.

- [X] The scraper should be able to visit the website http://shirts4mike.com and follow links to all t-shirts.

- [X] The scraper should get the price, title, url and image url from the product page and save it in the CSV (I have added a numbering column as well).

- [X] Use a third party npm package to create a CSV file named for the date it was created.

- [X] The column headers should be in in this order Title, Price, ImageURL, URL and Time. (I have added the numbering column)

- [X] If the data file for today already exists it should overwrite the file.

- [X] If the site is down, a human friendly error message describing the issue should appear in the console.

- [X] Code should be well documented.


## Extra Credit

- [X] Edit package.json file so thatthe program runs when the npm start command is run.

- [X] When an error occurs log it to a file scraper-error.log . It should append to the bottom of the file with a time stamp and error e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>

## Notes

 - I have checked my code in jshint and have verified that it is free of any syntax errors.

 - The addition of the numbering column was to allow for sorting afterwards.
