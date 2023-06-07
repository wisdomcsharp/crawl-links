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

## URL Normalization

The crawl-links script performs URL normalization to ensure consistent and uniform URLs across different types. Here's how it handles normalization for various URL formats:

## Absolute URLs

Absolute URLs, such as https://example.com/path/to/page, are already complete URLs that point to a specific web page. The script does not modify absolute URLs during the normalization process. They are used as-is to retrieve the webpage content.

## Relative URLs

Relative URLs, such as /path/to/page or ../path/to/page, are URLs that are relative to the current page's URL. The script converts relative URLs to absolute URLs by combining them with the base URL of the current page. For example, if the base URL is https://example.com, a relative URL of /path/to/page will be normalized to https://example.com/path/to/page.

## Protocol-less URLs

Protocol-less URLs, such as //example.com/path/to/page, do not specify a protocol (e.g., http or https). The script automatically adds the appropriate protocol based on the page's URL. For example, if the current page URL is https://example.com, a protocol-less URL of //example.com/path/to/page will be normalized to https://example.com/path/to/page.

## Fragment URLs

Fragment URLs, such as https://example.com/page#section, include a fragment identifier starting with a # symbol. The script removes the fragment part during normalization to avoid duplicate URLs. For example, https://example.com/page#section will be normalized to https://example.com/page.

## Trailing Slashes

The script removes trailing slashes from URLs to ensure consistency. For example, https://example.com/path/ will be normalized to https://example.com/path.

By performing these normalization techniques, the crawl-links script ensures that URLs are consistent, avoids duplicates caused by different URL variations, and facilitates proper navigation through the website's structure.

## Contribution
Contributions, issues, and feature requests are welcome! Feel free to check the GitHub repository and contribute to make Crawl Links even better.

License
This project is licensed under the [MIT License](https://opensource.org/license/mit/)