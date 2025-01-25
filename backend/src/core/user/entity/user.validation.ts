import z from 'zod'

import { validate } from '../../../shared/utils/validate'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

const messages = {
  name: {
    required: 'Nome é obrigatório',
    min: 'Nome não pode ser vazio'
  },
  username: {
    required: 'Usuário é obrigatório',
    min: 'Usuário não pode ser vazio'
  },
  password: {
    required: 'Senha é obrigatória',
    regex:
      'A senha precisa conter 8 caracteres com letras minúsculas, letras maiúsculas e números'
  }
}

const createUserSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string({ required_error: messages.name.required })
    .min(1, { message: messages.name.min }),
  username: z
    .string({ required_error: messages.username.required })
    .min(1, { message: messages.username.min })
    .toLowerCase(),
  password: z
    .string({ required_error: messages.password.required })
    .regex(PASSWORD_REGEX, { message: messages.password.regex }),
  createdAt: z.date(),
  updatedAt: z.date()
})

const updateUserSchema = z.object({
  name: z.string().min(1, { message: messages.name.min }).optional(),
  username: z
    .string()
    .min(1, { message: messages.username.min })
    .toLowerCase()
    .optional(),
  password: z
    .string()
    .regex(PASSWORD_REGEX, { message: messages.password.regex })
    .optional(),
  updatedAt: z.date()
})

export function validateCreation(
  object: z.infer<typeof createUserSchema>
): z.infer<typeof createUserSchema> {
  return validate(createUserSchema, object)
}

export function validateUpdate(
  object: z.infer<typeof updateUserSchema>
): z.infer<typeof updateUserSchema> {
  return validate(updateUserSchema, object)
}
