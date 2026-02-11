export type DeepValueOf<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? DeepValueOf<T[keyof T]>
    : never;
