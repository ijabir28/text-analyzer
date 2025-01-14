const { createApi } = require('./use-cases/api');
const { createDBService } = require('./use-cases/db');

const PORT = 3000;

const DBService = createDBService();

const api = createApi({ DBService });

api.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
