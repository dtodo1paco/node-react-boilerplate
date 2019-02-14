/*
 Validator functions for forms
 */
export const required = value => value != null && value.length > 0;

const VALID_MAIL_EXPR = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
export const email = value =>
  value != null && value.length > 0 && VALID_MAIL_EXPR.test(value);
