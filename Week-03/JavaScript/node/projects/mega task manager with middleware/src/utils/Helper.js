export const buildQueryOptions = (query) => {
    const options = {};

    // 1️⃣ Filtering
    const filter = {};
    if (query.completed !== undefined) {
        filter.completed = query.completed === 'true';
    }
    if (query.title) {
        filter.title = { $regex: query.title, $options: 'i' }; // case-insensitive search
    }

    // 2️⃣ Sorting
    let sort = {};
    if (query.sort) {
        const [field, order] = query.sort.split(':'); // e.g., createdAt:desc
        sort[field] = order === 'desc' ? -1 : 1;
    }

    // 3️⃣ Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    options.filter = filter;
    options.sort = sort;
    options.skip = skip;
    options.limit = limit;

    return options;
};
