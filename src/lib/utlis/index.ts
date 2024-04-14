
export type GExtractParam<T> = T extends (args: {
  selectFields: infer P;
}) => unknown
  ? P
  : never;

export type GExtractSelectFields<T> = T extends (args: {
  selectFields: infer P;
}) => unknown
  ? P
  : never;

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};


export const getRatingColor = (rating: number) => {
  switch (true) {
    case rating >= 7:
      return '#3bb33b';
    case rating <= 5:
      return 'red';
    default:
      return '#777';
  }
};
