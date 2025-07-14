/**
 * Utility functions for trek data formatting
 */

/**
 * Get the proper image URL for trek images
 * @param {string} imageName - Image name or path
 * @returns {string} Full image URL
 */
export const getTrekImageUrl = (imageName) => {
    console.log("getTrekImageUrl - input:", imageName);

    if (!imageName || typeof imageName !== "string") {
        console.log("getTrekImageUrl - no image name, returning placeholder");
        return "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500&auto=format&fit=crop";
    }

    // If it's already a full URL, return as is
    if (imageName.startsWith("http://") || imageName.startsWith("https://")) {
        console.log("getTrekImageUrl - full URL detected, returning as is");
        return imageName;
    }

    // If it's a relative path, prefix with backend URL
    if (imageName.startsWith("/storage/") || imageName.startsWith("storage/")) {
        const backendUrl =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const result = `${backendUrl}/${imageName.replace(/^\/+/, "")}`;
        console.log(
            "getTrekImageUrl - relative path detected, returning:",
            result
        );
        return result;
    }

    // If it's just a filename, assume it's in the storage directory
    if (!imageName.includes("/")) {
        const backendUrl =
            import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const result = `${backendUrl}/storage/trek-images/${imageName}`;
        console.log("getTrekImageUrl - filename detected, returning:", result);
        return result;
    }

    // Default fallback
    console.log("getTrekImageUrl - fallback to placeholder");
    return "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500&auto=format&fit=crop";
};

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
    meetingPoint = null,
}) => {
    // Prepare inclusions and exclusions as arrays of strings
    console.log("formatTrekDataForAPI - raw inclusions:", inclusions);
    console.log("formatTrekDataForAPI - raw exclusions:", exclusions);

    const inclusionsArray = inclusions
        .map((inc) => inc.item || inc)
        .filter((item) => item && item.trim() !== "");

    const exclusionsArray = exclusions
        .map((exc) => exc.item || exc)
        .filter((item) => item && item.trim() !== "");

    console.log(
        "formatTrekDataForAPI - processed inclusions:",
        inclusionsArray
    );
    console.log(
        "formatTrekDataForAPI - processed exclusions:",
        exclusionsArray
    );

    // Prepare cancellation policies
    const cancellationPoliciesArray = cancellationPolicy
        ? [cancellationPolicy]
        : [];

    // Prepare activities from the activities state
    // Activities are now objects with 'id' property from activity selection
    console.log("formatTrekDataForAPI - raw activities:", activities);
    const activitiesArray = activities
        .map((activity) => activity.id)
        .filter((id) => id && Number.isInteger(id));
    console.log(
        "formatTrekDataForAPI - processed activities:",
        activitiesArray
    );

    // Debug logging for city_id mapping
    console.log("formatTrekDataForAPI - meetingPoint:", meetingPoint);
    console.log("formatTrekDataForAPI - trekData.city_id:", trekData.city_id);
    const finalCityId = meetingPoint?.cityId
        ? parseInt(meetingPoint.cityId)
        : trekData.city_id || null;
    console.log("formatTrekDataForAPI - final city_id:", finalCityId);

    return {
        name: trekData.name || "",
        destination_id: trekData.destination_id || null,
        city_id: finalCityId,
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
        meetingPoint:
            meetingPoint?.locationDetails || trekData.meetingPoint || "",
        meetingTime: meetingPoint?.time || trekData.meetingTime || "",
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

/**
 * Process activities from API data
 * @param {Array} activities - Activities from API (can be IDs or activityDetails)
 * @returns {Array} Processed activities for form
 */
export const processActivities = (activities, activityDetails = []) => {
    if (!Array.isArray(activities)) return [];

    // If activities is an array of IDs and we have activityDetails
    if (
        activities.length > 0 &&
        typeof activities[0] === "number" &&
        activityDetails.length > 0
    ) {
        return activities.map((activityId) => {
            const activityDetail = activityDetails.find(
                (ad) => ad.id === activityId
            );
            return {
                id: activityId,
                name: activityDetail
                    ? activityDetail.name
                    : `Activity ${activityId}`,
                category_name: activityDetail
                    ? activityDetail.category_name
                    : "",
            };
        });
    }

    // Handle different possible formats (fallback for backward compatibility)
    return activities
        .map((activity, index) => {
            if (typeof activity === "string") {
                return {
                    id: `activity-${index}`,
                    name: activity,
                };
            } else if (activity && typeof activity === "object") {
                return {
                    id: activity.id || `activity-${index}`,
                    name: activity.name || activity.activity || "",
                    category_name: activity.category_name || "",
                };
            }
            return {
                id: `activity-${index}`,
                name: "",
            };
        })
        .filter((activity) => activity.name && activity.name.trim() !== "");
};
