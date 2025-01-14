const crypto = require('crypto');

function createAuthService(dependencies) {
    const { DBService } = dependencies;

    return {
        login: async (email, password) => {
            const user = await DBService.getUserByEmail(email);

            if (user.password === password) {
                const userToken = crypto.randomBytes(64).toString('hex');

                DBService.createUserToken({ userId: user._id, userToken });

                return { userToken };
            } else {
                return {
                    error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" }
                }
            }

        }
    };
}

module.exports = { createAuthService };