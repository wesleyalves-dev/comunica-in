export type ExceptionDetails = Record<string, any>

export class Exception extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly details?: ExceptionDetails
  ) {
    super(message)
  }
}
