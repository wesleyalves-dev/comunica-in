export const MESSAGES_BY_STATUS = new Map(
  Object.entries({
    '404': 'Recurso não encontrado',
    '429': 'Limite de requisições excedido',
    '500': 'Erro interno do serviço externo'
  })
)
