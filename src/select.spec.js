describe('multi-selector', function() {
	var elm, scope, input;

	beforeEach(module('bs-select'));
	beforeEach(function() {
		jasmine.clock().install();
	});

	beforeEach(inject(function($rootScope, $compile, $filter) {
		elm = angular.element(
			'<div style="margin:200px">' +
				'<bs-select ng-model="model" collection="collection"></bs-select>' +
			'</div>'
		);

		$('body').append(elm);

		scope = $rootScope.$new();
		scope.collection = ["a", 'b', "c", "d", "e", "f", "g"];
		scope.collection = [
			{
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
			}, {
				"value": "California",
				"key": "CA"
			}, {
				"value": "Colorado",
				"key": "CO"
			}, {
				"value": "Connecticut",
				"key": "CT"
			}, {
				"value": "Delaware",
				"key": "DE"
			}, {
				"value": "District Of Columbia",
				"key": "DC"
			}, {
				"value": "Federated States Of Micronesia",
				"key": "FM"
			}, {
				"value": "Florida",
				"key": "FL"
			}, {
				"value": "Georgia",
				"key": "GA"
			}, {
				"value": "Guam",
				"key": "GU"
			}, {
				"value": "Hawaii",
				"key": "HI"
			}, {
				"value": "Idaho",
				"key": "ID"
			}, {
				"value": "Illinois",
				"key": "IL"
			}, {
				"value": "Indiana",
				"key": "IN"
			}, {
				"value": "Iowa",
				"key": "IA"
			}, {
				"value": "Kansas",
				"key": "KS"
			}, {
				"value": "Kentucky",
				"key": "KY"
			}, {
				"value": "Louisiana",
				"key": "LA"
			}, {
				"value": "Maine",
				"key": "ME"
			}, {
				"value": "Marshall Islands",
				"key": "MH"
			}, {
				"value": "Maryland",
				"key": "MD"
			}, {
				"value": "Massachusetts",
				"key": "MA"
			}, {
				"value": "Michigan",
				"key": "MI"
			}, {
				"value": "Minnesota",
				"key": "MN"
			}, {
				"value": "Mississippi",
				"key": "MS"
			}, {
				"value": "Missouri",
				"key": "MO"
			}, {
				"value": "Montana",
				"key": "MT"
			}, {
				"value": "Nebraska",
				"key": "NE"
			}, {
				"value": "Nevada",
				"key": "NV"
			}, {
				"value": "New Hampshire",
				"key": "NH"
			}, {
				"value": "New Jersey",
				"key": "NJ"
			}, {
				"value": "New Mexico",
				"key": "NM"
			}, {
				"value": "New York",
				"key": "NY"
			}, {
				"value": "North Carolina",
				"key": "NC"
			}, {
				"value": "North Dakota",
				"key": "ND"
			}, {
				"value": "Northern Mariana Islands",
				"key": "MP"
			}, {
				"value": "Ohio",
				"key": "OH"
			}, {
				"value": "Oklahoma",
				"key": "OK"
			}, {
				"value": "Oregon",
				"key": "OR"
			}, {
				"value": "Palau",
				"key": "PW"
			}, {
				"value": "Pennsylvania",
				"key": "PA"
			}, {
				"value": "Puerto Rico",
				"key": "PR"
			}, {
				"value": "Rhode Island",
				"key": "RI"
			}, {
				"value": "South Carolina",
				"key": "SC"
			}, {
				"value": "South Dakota",
				"key": "SD"
			}, {
				"value": "Tennessee",
				"key": "TN"
			}, {
				"value": "Texas",
				"key": "TX"
			}, {
				"value": "Utah",
				"key": "UT"
			}, {
				"value": "Vermont",
				"key": "VT"
			}, {
				"value": "Virgin Islands",
				"key": "VI"
			}, {
				"value": "Virginia",
				"key": "VA"
			}, {
				"value": "Washington",
				"key": "WA"
			}, {
				"value": "West Virginia",
				"key": "WV"
			}, {
				"value": "Wisconsin",
				"key": "WI"
			}, {
				"value": "Wyoming",
				"key": "WY"
			}
		];

		scope.model = scope.collection[20];

		$compile(elm)(scope);
		scope.$digest();
	}));

	afterEach(function() {
		jasmine.clock().uninstall();
		scope.$broadcast('$destroy');
		//elm.remove();
	});

	it('Should boot', function() {
		expect(1).toBe(1);
	});
});
