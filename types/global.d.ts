/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.scss' {
  const styles: any;
  export = styles;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
