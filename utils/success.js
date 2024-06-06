exports.success = {
    created: (message = 'Resource created successfully', ) => ({
        status: 201,
        message,
    }),
    ok: (message = 'Request successful', data = {}) => ({
        status: 200,
        message,
        data
    }),
    deleted: (message = 'Resource deleted successfully') => ({
        status: 200,
        message
    }),
    customSuccess: (status, message, data = {}) => ({
        status,
        message,
        data
    }),
    matchResultProcessed: {
        status: 200,
        message: 'Match results processed successfully'
    },
    winnersTeam: 'Winners Team'
};
