import noop from "lodash/noop";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined";

export const isDefined = <T>(value: T | undefined): value is T => !isUndefined(value);

export { isUndefined, isEmpty, isString, isNil, noop };
