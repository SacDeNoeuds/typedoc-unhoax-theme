/**
 * @module Library/Branded
 */

declare const tag: unique symbol
declare const value: unique symbol
export type Branded<T, Tag extends string> = BrandBase<T> & { [tag]: Tag; [value]: T }
export type BrandBase<T> = T extends { [value]: infer U } ? U : T
export type Brand<T> = T extends { [tag]: infer U } ? U : never

// type Foo = Branded<string, 'Foo'>
// type Bar = Branded<Foo, 'Bar'>

// type FooBase = BrandBase<Foo>
// type FooBrand = Brand<Foo>

// type BarBrand = Brand<Bar>
// type BarBase = BrandBase<Bar>
