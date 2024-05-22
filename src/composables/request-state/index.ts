import { Ref } from 'vue';

const useRequestState = (isFetched: Ref, data: object[] | object) => {
    const dataIsNotEmptyAfterFetch = () => {
        if (Array.isArray(data)) {
            return isFetched.value && data.length > 0;
        } else {
            return isFetched.value && Object.keys(data).length > 0;
        }
    };
    const dataIsEmptyAfterFetch = () => {
        if (Array.isArray(data)) {
            return isFetched.value && data.length === 0;
        } else {
            return isFetched.value && Object.keys(data).length === 0;
        }
    };

    const dataIsEmptyBeforeFetch = () => {
        if (Array.isArray(data)) {
            return !isFetched.value && data.length === 0;
        } else {
            return !isFetched.value && Object.keys(data).length === 0;
        }
    };

    return {
        dataIsNotEmptyAfterFetch,
        dataIsEmptyBeforeFetch,
        dataIsEmptyAfterFetch,
    };
};

export default useRequestState;
