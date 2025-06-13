/**
 * @typedef {Object} TrekLocation
 * @property {string} name
 * @property {string} state
 */

/**
 * @typedef {Object} TrekCategory
 * @property {string} name
 */

/**
 * @typedef {Object} TrekVendor
 * @property {string} [company_name]
 * @property {string} [contact_phone]
 */

/**
 * @typedef {Object} TrekDate
 * @property {string} id
 * @property {string} start_date
 * @property {string} end_date
 * @property {number} price_per_person
 * @property {number} available_slots
 * @property {number} booked_slots
 */

/**
 * @typedef {Object} Trek
 * @property {number} id
 * @property {string} name
 * @property {string} destination
 * @property {number} duration_days
 * @property {number} price
 * @property {number} [max_participants]
 * @property {string} difficulty_level
 * @property {string} description
 * @property {string[]} [images]
 * @property {string[]} [inclusions]
 * @property {string[]} [exclusions]
 * @property {string[]} [what_to_bring]
 * @property {any} [itinerary]
 * @property {any} [pickup_points]
 * @property {TrekLocation|null} [location]
 * @property {TrekCategory|null} [category]
 * @property {TrekVendor|null} [vendor]
 * @property {TrekDate[]} [trek_dates]
 * @property {boolean} is_active
 * @property {string} created_at
 */
