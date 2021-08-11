export type KnownKeys<T> = keyof { [K in keyof T as string extends K ? never : K]: K }
