class ValidatorUtility {
    isFalsy(input: any) { return input ? false : true; }
    isTruthy(input: any) { return input ? true : false; }
    isUndefined(input: any) { return input === "undefined" ? true : false }
}
export default ValidatorUtility;