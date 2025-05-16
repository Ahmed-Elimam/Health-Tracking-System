exports.parseQueryParams = query => {
    const { sortBy, ...filters } = query;
    const sort = {};

    if (sortBy) {
        const fields = sortBy.split(',');
        fields.forEach(field => {
            const [key, order] = field.split(':');
            sort[key] = order === 'desc' ? -1 : 1;
        });
    }

    return { filters, sort };
};
