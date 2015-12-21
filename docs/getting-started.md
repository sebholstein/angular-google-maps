---
title: Getting started
description: Getting started with angular2-google-maps
---

## Playing with angular2-google-maps

If you just want to play with `angular2-google-maps` and don't want to set up a full project, you can use the following Plunker. It has all the dependencies to play with Angular2, Typescript and of course `angular2-google-maps`:

[&raquo; Play with angular2-google-maps on Plunker](http://plnkr.co/edit/YX7W20?p=preview)

## Installation

angular2-google-maps is shipped via the Node Package Manager. So make sure that you have [NodeJS](https://nodejs.org) installed. 
  
You can install the package with the following command:

```shell
npm install angular2-google-maps
```
This package contains different sources for different users:

1. The files located in the root dir are ES5 compatible files that can be consumed using CommonJS.
2. The files under `/es6` are ES6 compatible files that can be transpiled to E5 using any transpiler.
3. The files under `/ts` are the TypeScript source files.
4. The `/bundles` directory contains the following files:
  * `angular2-google-maps.js` and `angular2-google-maps.min.js` are bundles that can be consumed using SystemJS.
