import {ref} from "vue";

// temp any type
const useRef = (initialValue: any) => {
    const value = ref(initialValue);
    const setValue = (newValue: any) => value.value = newValue;

    return [value, setValue];
}

export default useRef;