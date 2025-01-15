const { createApi } = require('./use-cases/api');
const { createDBService } = require('./use-cases/db');
const { createLogger } = require('./use-cases/logger');

const PORT = 3000;

(async function () {
    const DBService = await createDBService();
    const logger = createLogger();

    const api = createApi({ DBService, logger });

    api.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

})();

