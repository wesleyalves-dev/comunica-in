import type { ZodObject, ZodError } from 'zod'

import { Exception } from '../exception'

export function validate<Output>(schema: ZodObject<any>, object: any): Output {
  try {
    return schema.parse(object) as Output
  } catch (error: any) {
    const zodError = error as ZodError
    const issues = zodError.issues.map(issue => ({
      message: issue.message,
      path: issue.path.join('.')
    }))
    throw new Exception('Dados inválidos', 400, { issues })
  }
}
