import {
    anyPass,
    compose,
    curry,
    omitBy,
  } from 'lodash/fp';
  import * as _ from 'lodash';

export const isNilOrEmpty = anyPass([
    _.isNil,
    _.cond([[_.isObject, _.isEmpty]]),
]);

export const getParamValid = curry((params: any, transform: any) =>
  compose(
    omitBy(isNilOrEmpty),
    transform,
  )(params),
);
