
export const toMongoDbDate = (queryDate: string): Date => {

    if (queryDate === undefined) {
        return;
    }

    return new Date(queryDate);
}