# Reader: SVG

Recursively walks through file-system and builds optimized SVG snippets ready to be injected in HTML.

![Version](https://img.shields.io/npm/v/@resource-sentry/reader-svg.svg)
![Dependencies](https://david-dm.org/resource-sentry/reader-svg.svg)

## Installation

> yarn add --dev @resource-sentry/reader-svg

## Configuration

- `entry`, path to a directory with SVG files.

## Example

```
-- [images]
---- logo.svg
---- header.svg
---- [media]
------ play.svg
------ stop.svg
```

SVG files will be optimized and added into `rs.js` file ready for use in production code.

```js
import Rs from './rs';

Rs.getResource(Rs.Graphic.LOGO); // Returns XML code for the "logo.svg" asset
Rs.getResource(Rs.Graphic.MEDIA_STOP); // Returns XML code for the "stop.svg" asset
```