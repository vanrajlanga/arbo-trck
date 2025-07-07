/**
 * Utility functions for trek data formatting
 */

/**
 * Format trek data for API submission
 * @param {Object} trekData - Raw trek form data
 * @param {Array} inclusions - Inclusions array
 * @param {Array} exclusions - Exclusions array
 * @param {Array} itinerary - Itinerary array
 * @param {Array} accommodations - Accommodations array
 * @param {Array} trekStages - Trek stages array
 * @param {Array} batches - Batches array
 * @param {Array} activities - Activities array
 * @param {Object} cancellationPolicy - Cancellation policy object
 * @param {Array} otherPolicies - Other policies array
 * @param {Array} images - Images array
 * @returns {Object} Formatted trek data for API
 */
export const formatTrekDataForAPI = ({
    trekData,
    inclusions = [],
    exclusions = [],
    itinerary = [],
    accommodations = [],
    trekStages = [],
    batches = [],
    activities = [],
    cancellationPolicy = null,
    otherPolicies = [],
    images = [],
}) => {
    // Prepare inclusions and exclusions as arrays of strings
    const inclusionsArray = inclusions
        .map((inc) => inc.item || inc)
        .filter((item) => item && item.trim() !== "");

    const exclusionsArray = exclusions
        .map((exc) => exc.item || exc)
        .filter((item) => item && item.trim() !== "");

    // Prepare cancellation policies
    const cancellationPoliciesArray = cancellationPolicy
        ? [cancellationPolicy]
        : [];

    // Prepare activities from the activities state
    const activitiesArray = activities.map((activity) => ({
        day: activity.day,
        activities: activity.activities || [],
    }));

    return {
        name: trekData.name || "",
        destination_id: trekData.destination_id || null,
        city_id: trekData.city_id || null,
        description: trekData.description || "",
        trekType: trekData.trekType || "",
        category: trekData.category || "",
        duration: trekData.duration || "",
        durationDays: parseInt(trekData.durationDays) || 0,
        durationNights: parseInt(trekData.durationNights) || 0,
        price: parseFloat(trekData.price) || 0,
        difficulty: trekData.difficulty || "moderate",
        status: trekData.status || "deactive",
        discountValue: parseFloat(trekData.discountValue) || 0.0,
        discountType: trekData.discountType || "percentage",
        hasDiscount: trekData.hasDiscount || false,
        inclusions: inclusionsArray,
        exclusions: exclusionsArray,
        meetingPoint: trekData.meetingPoint || "",
        meetingTime: trekData.meetingTime || "",
        itinerary: itinerary,
        accommodations: accommodations,
        trekStages: trekStages,
        images: images,
        batches: batches,
        cancellationPolicies: cancellationPoliciesArray,
        otherPolicies: otherPolicies,
        activities: activitiesArray,
    };
};

/**
 * Format API response data for form state
 * @param {Object} apiData - Data from API response
 * @returns {Object} Formatted data for form state
 */
export const formatTrekDataForForm = (apiData) => {
    return {
        name: apiData.name || apiData.title || "",
        destination_id: apiData.destination_id
            ? String(apiData.destination_id)
            : "",
        city_id: apiData.city_id ? String(apiData.city_id) : "",
        description: apiData.description || "",
        trekType: apiData.trekType || apiData.trek_type || "",
        category: apiData.category || "",
        duration: apiData.duration || "",
        durationDays: apiData.durationDays || apiData.duration_days || "",
        durationNights: apiData.durationNights || apiData.duration_nights || "",
        price: apiData.price || apiData.base_price || "",
        difficulty: apiData.difficulty || "moderate",
        status: apiData.status || "deactive",
        discountValue:
            parseFloat(apiData.discountValue || apiData.discount_value) || 0.0,
        discountType:
            apiData.discountType || apiData.discount_type || "percentage",
        hasDiscount: apiData.hasDiscount || apiData.has_discount || false,
        meetingPoint: apiData.meetingPoint || apiData.meeting_point || "",
        meetingTime: apiData.meetingTime || apiData.meeting_time || "",
    };
};

/**
 * Process inclusions from API data
 * @param {Array} inclusions - Inclusions from API
 * @returns {Array} Processed inclusions for form
 */
export const processInclusions = (inclusions) => {
    if (!Array.isArray(inclusions)) return [];

    return inclusions.map((item, index) => ({
        id: `inclusion-${index}`,
        item: typeof item === "string" ? item : item.item || "",
    }));
};

/**
 * Process exclusions from API data
 * @param {Array} exclusions - Exclusions from API
 * @returns {Array} Processed exclusions for form
 */
export const processExclusions = (exclusions) => {
    if (!Array.isArray(exclusions)) return [];

    return exclusions.map((item, index) => ({
        id: `exclusion-${index}`,
        item: typeof item === "string" ? item : item.item || "",
    }));
};

/**
 * Process batches from API data
 * @param {Array} batches - Batches from API
 * @returns {Array} Processed batches for form
 */
export const processBatches = (batches) => {
    if (!Array.isArray(batches) || batches.length === 0) {
        return [{ startDate: "", endDate: "", capacity: 20 }];
    }

    return batches.map((batch) => ({
        id: batch.id,
        startDate: batch.startDate || batch.start_date || "",
        endDate: batch.endDate || batch.end_date || "",
        capacity: batch.capacity || 20,
    }));
};

/**
 * Process cancellation policies from API data
 * @param {Array} cancellationPolicies - Cancellation policies from API
 * @returns {Object} Processed cancellation policy for form
 */
export const processCancellationPolicy = (cancellationPolicies) => {
    if (
        !Array.isArray(cancellationPolicies) ||
        cancellationPolicies.length === 0
    ) {
        return {
            title: "Cancellation Policy",
            description: "Standard cancellation terms and conditions",
            rules: [
                { rule: "Full refund", deduction: "0%" },
                { rule: "Partial refund", deduction: "50%" },
                { rule: "No refund", deduction: "100%" },
            ],
            descriptionPoints: [
                "Cancellation must be made in writing",
                "Refunds processed within 5-7 business days",
                "Force majeure events may affect cancellation terms",
            ],
        };
    }

    return cancellationPolicies[0];
};
