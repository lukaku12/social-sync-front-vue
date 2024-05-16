const useRequestState = (isFetched: boolean, data: object[] | object) => {

    const dataIsNotEmptyAfterFetch = () => {
        if (Array.isArray(data)) {
            return isFetched && data.length > 0;
        } else {
            return (isFetched && Object.keys(data).length > 0);
        }
    }
    const dataIsEmptyAfterFetch = () => {
        if (Array.isArray(data)) {
            return isFetched && data.length === 0;
        } else {
            return isFetched && Object.keys(data).length === 0;
        }
    }

    const dataIsEmptyBeforeFetch = () => {
        if (Array.isArray(data)) {
            return !isFetched && data.length === 0;
        } else {
            return !isFetched && Object.keys(data).length === 0;
        }
    }

    return {
        dataIsNotEmptyAfterFetch,
        dataIsEmptyBeforeFetch,
        dataIsEmptyAfterFetch,
    }
}

export default useRequestState;