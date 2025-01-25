export function removeEmptyProps<Type>(object: Type): Partial<Type> {
  return Object.fromEntries<Partial<Type>>(
    Object.entries(object as object).filter(([_, value]) => value !== "")
  ) as Partial<Type>;
}
