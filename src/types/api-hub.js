/**
 * @typedef {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"|"OPTIONS"|"HEAD"} HttpMethod
 */

/**
 * @typedef {Object} Parameter
 * @property {string} name
 * @property {string} value
 * @property {string} [description]
 * @property {boolean} required
 * @property {string} type
 */

/**
 * @typedef {Object} RequestSample
 * @property {string} [id]
 * @property {string} name
 * @property {string} [description]
 * @property {string} [body]
 * @property {Object<string, string>} [headers]
 * @property {Object<string, string>} [queryParams]
 * @property {Object<string, string>} [pathParams]
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} ResponseSample
 * @property {string} [id]
 * @property {string} name
 * @property {string} [description]
 * @property {string} body
 * @property {Object<string, string>} [headers]
 * @property {number} statusCode
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} ApiEndpoint
 * @property {string} [id]
 * @property {string} name
 * @property {string} endpoint
 * @property {HttpMethod} method
 * @property {string} [description]
 * @property {string} [module_name]
 * @property {string} [function_name]
 * @property {string} [page_name]
 * @property {string} [status]
 * @property {string} [response_format]
 * @property {Parameter[]} [parameters]
 * @property {string} [requestBodySchema]
 * @property {string} [responseBodySchema]
 * @property {RequestSample[]} [requestSamples]
 * @property {ResponseSample[]} [responseSamples]
 * @property {string[]} [tags]
 * @property {boolean} [is_internal]
 * @property {boolean} [is_documented]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} statusCode
 * @property {string} body
 * @property {Object<string, string>} headers
 * @property {number} duration
 */

export default {};
