import type {Ref} from "vue";
import isEmpty from "validator/es/lib/isEmpty";
import isAlpha from "validator/es/lib/isAlpha";

export default function useNameValidator(nameRef: Ref<{
    name?: string | null,
    changed: boolean
}>, forceValidate: boolean) {
    function validateName() {
        if (!nameRef.value.changed && !forceValidate) return null;
        const name = nameRef.value.name;
        if (name === null || isEmpty(name ?? "")) return "Required";
        if (!isAlpha(name ?? "")) return "Name can only be letters";
        return null;
    }

    return {validateName};
}