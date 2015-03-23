# bs-select
A consistently styled cross-browser and keyboard friendly select component

## Requirements
 - Angular 1.3
 - Lodash
 - jQuery

## Installation
1. Install through npm `npm install --save bs-select`
2. Make sure your angular app depends upon 'bs-select':
```javascript
angular.module('app', ['bs-select']);
```

## Usage
### Markup:
```html
<bs-select ng-model="model" collection="collection"></bs-select>
```

```javascript
scope.model = {
	value: "Arizona",
	key: "AZ"
};

scope.collection = [{
	"value": "Alabama",
	"key": "AL"
}, {
	"value": "Alaska",
	"key": "AK"
}, {
	"value": "American Samoa",
	"key": "AS"
}, {
	"value": "Arizona",
	"key": "AZ"
}, {
	"value": "Arkansas",
	"key": "AR"
}];

```
## Demo
http://beanstalkhq.github.io/bs-select/
