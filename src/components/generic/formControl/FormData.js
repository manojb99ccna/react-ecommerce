import { isNullObject } from "../../../utility/Utility";

const FormData = (formRef) => {

    let hasError = false;

    let errorMessages = {};

    let input = {};

    let errorField = {};

    const fn = (referance, key) => {
        if (!isNullObject(referance.isUnmount) && referance.isUnmount) {
            /** DO NOTHING IN CASE OF UNMOUNT */
        }
        else if (referance.props.isRequired && (referance.state.hasError || referance.state.isUntouched)) {
            hasError = true;
            referance.onBlur();
            errorField[key] = referance.state.value;
        } else {
            if (referance.state.hasError) {
                hasError = true;
                errorField[key] = referance.state.value;
            }
            const componentType = referance.state.componenetName;
            input[key] = componentType === 'Image' ? referance.state.src : componentType === 'TypeaheadSelect' ? referance.getFinalValue() : referance.state.value;
        }
    }

    Object.keys(formRef).map(key => {
        const elementRef = formRef[key];
        //const componentType = elementRef.constructor.name;
        const componentType = elementRef.state.componenetName;
        if (componentType == 'RangeInput') {
            fn(elementRef.formRef[elementRef.props.fromName], elementRef.props.fromName);
            fn(elementRef.formRef[elementRef.props.toName], elementRef.props.toName);
        } else if (componentType == 'ServerInput') {
            fn(elementRef.formRef.current, elementRef.props.name);
        } else {
            fn(elementRef, key);
        }
    });

    const data = { hasError: hasError, input: input, errorMessages: errorMessages, errorField: errorField };

    console.log('#### Formdata: ', data);

    return data;

}

export default FormData;
