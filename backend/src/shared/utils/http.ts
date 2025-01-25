export function statusCodeByContent(content?: any): number {
  return content ? 200 : 404
}
