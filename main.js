"use strict";

const fetch = require('node-fetch');

function WpApi (apiPath) {
	apiPath = apiPath.replace('marketslive', '');

	while (apiPath[0] === '/') {
		apiPath = apiPath.substr(1, apiPath.length);
	}

	const apiUrl = `${this.baseUrl}/marketslive/${apiPath}`;
	const apiVersion = 2;


	function getUrlWithQueryParams(queryParams) {
		let separator = '?';
		let url = apiUrl;

		if (apiUrl.indexOf('?') !== -1) {
			separator = '&';
		}

		url += `${separator}v=${apiVersion}`;
		separator = '&';

		if (queryParams) {
			Object.keys(queryParams).forEach((key) => {
				url += `${separator}${key}=${queryParams[key]}`;
				separator = '&';
			});
		}

		url += `${separator}_=${new Date().getTime()}`;

		return url;
	}


	function fetchApi (url) {
		return fetch(url).then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				const error = new Error(res.statusText);
				error.response = res;
				throw error;
			}
		});
	}

	this.catchup = function () {
		return fetchApi(getUrlWithQueryParams({
			action: 'catchup'
		}));
	};

	this.catchupJson = function () {
		return fetchApi(getUrlWithQueryParams({
			action: 'catchup',
			format: 'json'
		}));
	};

	this.transcript = function () {
		return fetchApi(getUrlWithQueryParams({
			action: 'transcript_catchup'
		}));
	};

	this.transcriptJson = function () {
		return fetchApi(getUrlWithQueryParams({
			action: 'transcript_catchup',
			format: 'json'
		}));
	};

	this.status = function () {
		return fetchApi(getUrlWithQueryParams({
			action: 'getmeta'
		}));
	};

	this.init = function () {
		return fetchApi(getUrlWithQueryParams({
			action: 'init'
		}));
	};
}

WpApi.setBaseUrl = function (baseUrl) {
	WpApi.prototype.baseUrl = baseUrl;
};
module.exports = WpApi;
