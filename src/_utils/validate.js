const validate = (validationRules) => {

  return (itemToValidate, stateErrors, fieldName = null) => {
    let isValid = true;
    let errors = Object.assign({}, stateErrors);
    let fieldNames = [];

    if (fieldName) {
      fieldNames.push(fieldName);
    }
    else {
      for (let fieldName in itemToValidate) {
        if (itemToValidate.hasOwnProperty(fieldName))
          fieldNames.push(fieldName);
      }
    }

    for (let i = 0; i < fieldNames.length; i++) {
      const fieldName = fieldNames[i];
      let isInvalidField = false;
      const validationRule = validationRules[fieldName];
      const error = validationRule && validationRule(itemToValidate);
      isInvalidField = !!error;
      errors[fieldName] = error;
      isValid = isValid && !isInvalidField;
    }

    return {errors, isValid};
  };

};

export default validate;
