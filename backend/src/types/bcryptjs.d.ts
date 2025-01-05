declare module "bcryptjs" {
  export function hash(password: string, saltRounds: number): Promise<string>;
  export function compare(password: string, hash: string): Promise<boolean>;
}

declare module "sanitize-html" {
  export function sanitize(input: string): string;
  const sanitize: (input: string) => string;
  export = sanitize;
}