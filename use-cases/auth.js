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

        },

        authenticate: async (req, res, next) => {
            
            const user = await DBService.getUserByToken(req.headers.usertoken);

            if (user) {
                req.user = user;
                return next();
            } else {
                res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Unauthorized" } });
            }
        }
    };
}

module.exports = { createAuthService };