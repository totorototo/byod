// see https://medium.com/dailyjs/functional-js-with-es6-recursive-patterns-b7d0813ef9e3

export const head = ([x]) => x;

export const tail = ([, ...xs]) => xs;

export const def = (x) => typeof x !== "undefined";

export const undef = (x) => !def(x);

export const copy = (array) => [...array];

export const length = ([x, ...xs], len = 0) =>
  def(x) ? length(xs, len + 1) : len;

export const reverse = ([x, ...xs]) => (def(x) ? [...reverse(xs), x] : []);

export const first = ([x, ...xs], n = 1) =>
  def(x) && n ? [x, ...first(xs, n - 1)] : [];

export const last = (xs, n = 1) => reverse(first(reverse(xs), n));

export const slice = ([x, ...xs], i, y, curr = 0) =>
  def(x)
    ? curr === i
      ? [y, x, ...slice(xs, i, y, curr + 1)]
      : [x, ...slice(xs, i, y, curr + 1)]
    : [];

export const isArray = (x) => Array.isArray(x);

export const flatten = ([x, ...xs]) =>
  def(x)
    ? isArray(x)
      ? [...flatten(x), ...flatten(xs)]
      : [x, ...flatten(xs)]
    : [];

export const swap = (a, i, j) =>
  map(a, (x, y) => {
    if (y === i) return a[j];
    if (y === j) return a[i];
    return x;
  });

export const map = ([x, ...xs], fn) => {
  if (undef(x)) return [];
  return [fn(x), ...map(xs, fn)];
};

export const filter = ([x, ...xs], fn) =>
  def(x) ? (fn(x) ? [x, ...filter(xs, fn)] : [...filter(xs, fn)]) : [];

export const reject = ([x, ...xs], fn) => {
  if (undef(x)) return [];
  if (!fn(x)) {
    return [x, ...reject(xs, fn)];
  } else {
    return [...reject(xs, fn)];
  }
};

export const partition = (xs, fn) => [filter(xs, fn), reject(xs, fn)];

export const reduce = ([x, ...xs], fn, memo, i = 0) =>
  def(x) ? reduce(xs, fn, fn(memo, x, i), i + 1) : memo;

export const reduceRight = (xs, fn, memo) => reduce(reverse(xs), fn, memo);

export const spreadArg =
  (fn) =>
  (...args) =>
    fn(args);

export const reverseArgs =
  (fn) =>
  (...args) =>
    fn(...reverse(args));

export const pluck = (key, object) => object[key];

export const flow =
  (...args) =>
  (init) =>
    reduce(args, (memo, fn) => fn(memo), init);

export const compose = (...args) => flow(...reverse(args));

export const min = ([x, ...xs], result = Infinity) =>
  def(x) ? (x < result ? min(xs, x) : result) : result;

export const max = ([x, ...xs], result = -Infinity) =>
  def(x) ? (x > result ? max(xs, x) : max(xs, result)) : result;

export const factorial = (x, acum = 1) =>
  x ? factorial(x - 1, x * acum) : acum;

export const quicksort = (xs) =>
  length(xs)
    ? flatten([
        quicksort(filter(tail(xs), (x) => x <= head(xs))),
        head(xs),
        quicksort(filter(tail(xs), (x) => x > head(xs))),
      ])
    : [];
