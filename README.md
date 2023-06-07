# Crawl Links

Crawl Links is a library that allows you to recursively crawl and scrape URLs from a website up to a specified depth. It provides flexibility for both Node.js and web browser environments.

developed by Wisdom Oparaocha

[Repository](https://github.com/wisdomcsharp/crawl-links)

## Compatibility

- Node.js: Version 12 or above
- Web Browsers: All modern browsers that support ES6

## Installation

You can install Crawl Links using npm:

```shell
npm install crawl-links
```

## Configuration
To use Crawl Links, follow these steps:

Import the library into your project:

```js
// For Node.js
const crawlLinks = require('crawl-links');

// For Web Browser (with module bundler)
import crawlLinks from 'crawl-links';
```

## Define the configuration options

```js
const options = {
  urls: ['https://example.com'],
  maxDepth: 2,
  maxConcurrentRequests: 5,
};
```

- urls (required): An array of URLs to start crawling from.
- maxDepth (optional, default: 1): The maximum depth level to crawl. Set to 0 for single-page scraping.
- maxConcurrentRequests (optional, default: 5): The maximum number of concurrent requests to send.

## Call the crawlLinks function

```js
crawlLinks(options)
  .then((result) => {
    // Process the result
    console.log('Scraped Links:', result.scrapedLinks);
    console.log('Ignored Links:', result.ignoreLinks);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## Usage
- To start crawling, provide an array of URLs in the urls option.
- The crawler will visit each URL and extract all the links found on the page.
- It will then follow the links to the specified depth level, scraping URLs along the way.
- Concurrent requests are limited to the specified maxConcurrentRequests value.
- The result object contains the scrapedLinks and ignoreLinks arrays, which can be processed accordingly.

## Examples
Here are some examples of how to use Crawl Links:

### Example 1: Single-Page Scraping

```js 
const options = {
  urls: ['https://example.com'],
  maxDepth: 0,
};

crawlLinks(options)
  .then((result) => {
    console.log('Scraped Links:', result.scrapedLinks);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

```

This example performs scraping on a single page (maxDepth: 0), extracting all the links found on that page.

## Example 2: Multi-Page Scraping

```js
const options = {
  urls: ['https://example.com'],
  maxDepth: 2,
  maxConcurrentRequests: 10,
};

crawlLinks(options)
  .then((result) => {
    console.log('Scraped Links:', result.scrapedLinks);
    console.log('Ignored Links:', result.ignoreLinks);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

This example performs scraping on a website up to a depth of 2, with a maximum of 10 concurrent requests.

## Contribution
Contributions, issues, and feature requests are welcome! Feel free to check the GitHub repository and contribute to make Crawl Links even better.

License
This project is licensed under the [MIT License](https://opensource.org/license/mit/)