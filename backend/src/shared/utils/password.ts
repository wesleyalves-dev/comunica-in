import bcrypt from 'bcryptjs'

export function hash(value: string): string {
  return bcrypt.hashSync(value, bcrypt.genSaltSync())
}

export function compare(value: string, hash: string): boolean {
  return bcrypt.compareSync(value, hash)
}
