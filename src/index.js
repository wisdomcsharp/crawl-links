const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const normalizeURL = (url) => {
  // Normalize URLs to remove duplicates with different trailing slashes or fragments
  const normalizedLink = (new URL(url)).href;
  const withoutFragment = normalizedLink.split('#')[0]; // Remove fragment
  const withoutConsecutiveSlashes = withoutFragment.replace(/([^:])\/{2,}/g, '$1/'); // Replace consecutive slashes with a single slash
  const trimmedLink = withoutConsecutiveSlashes.replace(/\/+$/, ''); // Remove trailing slashes
  return trimmedLink;
};

const crawlDomain = async (urls, maxDepth = 1, maxConcurrentRequests = 5) => {
  const visitedUrlsSet = new Set();
  const scrapedLinksSet = new Set();
  const ignoreLinksSet = new Set();

  const crawl = async (url, currentDepth) => {
    console.log('scraping', url, 'at depth', currentDepth, 'of', maxDepth);
    const normalizedURL = normalizeURL(url);

    if (visitedUrlsSet.has(normalizedURL) || ignoreLinksSet.has(normalizedURL)) {
      return;
    }

    visitedUrlsSet.add(normalizedURL);

    try {
      const instance = axios.create({
        headers: {
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en',
          'Cache-Control': 'max-age=0',
          'Cb-Device-Type': 'web',
          'Dnt': 1,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        timeout: 5000,
        maxRedirects: 5,
      });

      const response = await instance.get(url);
      const $ = cheerio.load(response.data);

      const links = $('a')
        .map((_, element) => $(element).attr('href'))
        .get();

      const absoluteLinks = links.map(link => {
        if (link.startsWith('http://') || link.startsWith('https://')) {
          return link; // Already an absolute URL, no need to convert
        } else {
          const baseUrlObj = new URL(url);
          const absoluteURL = baseUrlObj.origin + "/" + link; // Convert relative URL to absolute URL
          return absoluteURL;
        }
      });

      const filteredLinks = absoluteLinks.filter(link => {
        try {
          const parsedURL = new URL(link);
          const parsedURLHostname = parsedURL.hostname.replace(/^[^.]+\./, '');
          const baseHostname = new URL(url).hostname.replace(/^[^.]+\./, '');
          const isSubdomain = parsedURLHostname === baseHostname;
          return isSubdomain;
        } catch (err) {
          return false;
        }
      });

      const normalizedLinks = filteredLinks.map(link => normalizeURL(link));

      normalizedLinks.forEach(link => {
        scrapedLinksSet.add(link);
      });

      if (currentDepth < maxDepth) {
        const requests = normalizedLinks
          .filter(link => !visitedUrlsSet.has(normalizeURL(link))) // Filter out already visited URLs
          .map(link => crawl(link, currentDepth + 1));
        const limitedRequests = requests.slice(0, maxConcurrentRequests);

        await Promise.all(limitedRequests);
      }
    } catch (error) {
      const normalizedURL = normalizeURL(url);

      switch (error.code) {
        case 'ECONNRESET':
        case 'ENOTFOUND':
        case 'ERR_BAD_REQUEST':
        case 'ECONNABORTED':
        case 403:
        case 404:
          ignoreLinksSet.add(normalizedURL);
          break;
        default:
          console.error(`Error ${error.code}: ${url}`);
          console.error(error);
          break;
      }
    }
  };

  const queue = [...urls];
  const activeRequests = queue.splice(0, maxConcurrentRequests);

  await Promise.all(activeRequests.map(url => crawl(url, 0)));

  return {
    scrapedLinks: Array.from(scrapedLinksSet),
    ignoreLinks: Array.from(ignoreLinksSet),
  };
};

module.exports = crawlDomain;
