import isValid from './ValidityChecker'

const validName = (name, showDelimeter = true) => {
  return isValid(name) ? `${name}${showDelimeter ? ', ' : ''}` : ''
}

export default validName;