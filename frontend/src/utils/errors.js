export const ERROR_TYPES = {
  MISSING_TRANSACTION: 'MissingTransaction',
  FAIL_TO_QUERY: 'FailToQuery',
  FAIL_TO_PARSE: 'FailToParse'
}

export const buildMissingTransactionErrorMessage = (cause) => {
  return `Falha ao carregar arquivo, falta transações relacionadas a venda afiliada: 
  ${cause}`
}

export const buildFailToQueryErrorMessage = () => {
  return `Falha ao acessar banco`
}

export const buildFailToParseErrorMessage = (cause, message) => {
  const [, errors] = message.split('Fail to parse transaction ')

  const errosTranslate = {
    kind: 'Tipo',
    value: 'Valor',
    date: 'Data',
    'seller name': 'Vendedor'
  }
  const errorMessage = []
  errors.split(', ').forEach((error) => {
    errorMessage.push(errosTranslate[error])
  })

  return `Erro ao ler: ${errorMessage.join(', ')} em ${cause}`
}
