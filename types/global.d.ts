//https://catchts.com/publish-subscribe

export type ValueOf<T> = T[keyof T];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type ListenRecord<T> = {
  [P in keyof T]: (name: P, callback: (arg: T[P]) => void) => void;
};

export type EmitRecord<T> = {
  [P in keyof T]: (name: P, data: T[P]) => void;
};

export type MakeOverloadings<T> = UnionToIntersection<ValueOf<T>>;
