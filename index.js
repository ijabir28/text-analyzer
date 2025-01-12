const { createApi } = require('./use-cases/api');
const { createDB } = require('./use-cases/db');

const PORT = 3000;

const db = createDB();

const api = createApi({ db });

api.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
