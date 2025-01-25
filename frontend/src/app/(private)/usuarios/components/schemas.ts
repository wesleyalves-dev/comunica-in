import z from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const UPDATE_PASSWORD_REGEX = /^(?:|(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,})$/;

const messages = {
  name: {
    required: "Nome é obrigatório",
    min: "Nome não pode ser vazio",
  },
  username: {
    required: "Usuário é obrigatório",
    min: "Usuário não pode ser vazio",
  },
  password: {
    required: "Senha é obrigatória",
    regex:
      "A senha precisa conter 8 caracteres com letras minúsculas, letras maiúsculas e números",
  },
  passwordConfirmation: {
    required: "Confirmação de senha é obrigatória",
    match: "A senha e a confirmação de senha devem ser iguais",
  },
};

export const createUserSchema = z
  .object({
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
    passwordConfirmation: z.string({
      required_error: messages.passwordConfirmation.required,
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: messages.passwordConfirmation.match,
    path: ["passwordConfirmation"],
  });

export const updateUserSchema = z
  .object({
    name: z.string().min(1, { message: messages.name.min }).optional(),
    username: z
      .string()
      .min(1, { message: messages.username.min })
      .toLowerCase()
      .optional(),
    password: z
      .string()
      .regex(UPDATE_PASSWORD_REGEX, { message: messages.password.regex })
      .optional(),
    passwordConfirmation: z
      .string({
        required_error: messages.passwordConfirmation.required,
      })
      .optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: messages.passwordConfirmation.match,
    path: ["passwordConfirmation"],
  });
