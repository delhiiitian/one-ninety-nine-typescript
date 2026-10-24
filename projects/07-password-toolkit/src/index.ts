// The public API of the toolkit. Other code imports from here, not from inner files,
// so the inside can be reorganised without breaking anyone.

export { generatePassword, generatePassphrase, type PasswordOptions } from "./generator.ts";
export { checkStrength, type Rating, type StrengthReport } from "./strength.ts";
