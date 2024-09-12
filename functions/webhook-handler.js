const viewCounts = {}; // Simple in-memory store

// Handler function for incoming Trello webhook events
exports.handler = async (event) => {
    const { id, type } = event.queryStringParameters;

    if (!id || !type) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request' })
        };
    }

    // Initialize view count if not present
    if (!viewCounts[id]) {
        viewCounts[id] = 0;
    }

    // Increment the view count
    viewCounts[id] += 1;

    return {
        statusCode: 200,
        body: JSON.stringify({ count: viewCounts[id] })
    };
};
