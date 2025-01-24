import z from 'zod'

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const createUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  username: z.string().min(1).toLowerCase(),
  password: z.string().regex(PASSWORD_REGEX),
  createdAt: z.date(),
  updatedAt: z.date()
})

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  username: z.string().min(1).toLowerCase().optional(),
  password: z.string().regex(PASSWORD_REGEX).optional(),
  updatedAt: z.date()
})

export function validateCreation(
  object: z.infer<typeof createUserSchema>
): z.infer<typeof createUserSchema> {
  return createUserSchema.parse(object)
}

export function validateUpdate(
  object: z.infer<typeof updateUserSchema>
): z.infer<typeof updateUserSchema> {
  return updateUserSchema.parse(object)
}
