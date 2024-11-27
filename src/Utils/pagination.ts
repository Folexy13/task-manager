

interface PaginationOptions {
    limit: number;
    page: number;
    total: number;
}

export const paginate = async <T>(model: any, options: PaginationOptions) => {
    const { limit, page } = options;

    // Calculate offset based on the current page
    const offset = (page - 1) * limit;

    // Fetch paginated data
    const result = await model.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']], // or any other field for ordering
    });

    const totalPages = Math.ceil(result.count / limit);
    const currentPage = page;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
        total: result.count,
        currentPage,
        previousPage,
        nextPage,
        totalPages,
        data: result.rows,
    };
};
