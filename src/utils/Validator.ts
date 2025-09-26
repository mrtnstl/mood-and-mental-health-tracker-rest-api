class ValidatorUtility {
    isFalsy(input: string | number | boolean | object) { return input ? false : true; }
    isTruthy(input: string | number | boolean | object) { return input ? true : false; }
    isUndefined(input: string | number | boolean | object) { return input === "undefined" ? true : false }
}
export default ValidatorUtility;