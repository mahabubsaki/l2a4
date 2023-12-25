
const queryBuilder = (obj: Record<string, any>) => {
    const meta = { page: obj?.page ? parseInt(obj.page) : 1, limit: obj?.limit ? parseInt(obj?.limit) : 10 };
    const filter: any = {};
    for (const key in obj) {
        if (key === 'minPrice' && obj[key]) {
            filter['price'] = filter['price'] || {};
            filter['price']['$gte'] = parseInt(obj[key]);
        }

        if (key === 'maxPrice' && obj[key]) {
            filter['price'] = filter['price'] || {};
            filter['price']['$lte'] = parseInt(obj[key]);
        }
        if (key === 'tags' && obj[key]) {
            filter['tags'] = { $elemMatch: { name: { $regex: new RegExp(obj[key], 'i') } } };
        }


        if (key === 'startDate' && obj[key]) {
            filter['startDate'] = filter['startDate'] || {};
            filter['startDate']['$gte'] = obj[key];
        }

        if (key === 'endDate' && obj[key]) {
            filter['endDate'] = filter['endDate'] || {};
            filter['endDate']['$lte'] = obj[key];
        }


        if (key === 'language' && obj[key]) {

            filter['language'] = { $regex: new RegExp(obj[key], 'i') };
        }

        if (key === 'provider' && obj[key]) {
            filter['provider'] = { $regex: new RegExp(obj[key], 'i') };
        }

        if (key === 'durationInWeeks' && obj[key]) {
            filter['durationInWeeks'] = parseInt(obj[key]);
        }

        if (key === 'level' && obj[key]) {
            filter['details.level'] = { $regex: new RegExp(obj[key], 'i') };
        }
    }
    const sort = (obj.sortBy && ['title', 'price', 'startDate', 'endDate', 'language', 'durationInWeeks'].includes(obj.sortBy)) ? { [obj.sortBy as string]: obj.sortOrder === 'asc' ? 1 : -1 } : {};

    return {
        meta,
        sort,
        filter
    };

};
export default queryBuilder;