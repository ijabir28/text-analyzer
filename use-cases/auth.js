function createAuthService(dependencies) {
    const { DBService } = dependencies;

    return {
        login: async (email, password) => {
            return `token-{email}`;
        },
        logout: async () => {
            // Call the API to logout
        },
    };
}

module.exports = { createAuthService };