const fetchHeaders = (url, {body, headers, ...opts} = {}) => fetch(url, {
	headers: {
		Accept: 'application/json',
		...(body ? {'Content-Type': 'application/json'} : undefined),
		...headers,
	},
	...opts,
	body: body && typeof body === 'object' ? JSON.stringify(body) : body
});


class FetchError extends Error {
	constructor(body) {
		const message = typeof body === 'string' ? body : body.message || 'API error';
		super(message);
	}
}

const toJson = r => (
	/^application\/json/.test(r.headers.get('Content-Type')) ? r.json() : r.text()
).then(body => r.ok ? body : Promise.reject(new FetchError(body)));

/**
 * fetchJson helper
 * @param {*} url
 * @param {*} fetchOpts: optional
 */
var index = (url, opts) => fetchHeaders(url, opts).then(toJson);

export default index;
export { fetchHeaders, FetchError, toJson };
