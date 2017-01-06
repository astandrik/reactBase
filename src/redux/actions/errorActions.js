export const SET_VALIDATION_ERRORS = "SET_VALIDATION_ERRORS";
import {
    generateActionFunc,
    fetchAsync
} from "./actionHelper.js";

export const showValidationErrors = generateActionFunc(SET_VALIDATION_ERRORS);

