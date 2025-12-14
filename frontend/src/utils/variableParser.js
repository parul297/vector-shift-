/**
 * Extract variables from text in the format {{ variable_name }}
 * @param {string} text - The input text
 * @returns {Array} Array of unique variable names
 */
export const extractVariables = (text) => {
  if (!text) return [];
  
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const matches = [...text.matchAll(variableRegex)];
  const uniqueVars = [...new Set(matches.map(match => match[1]))];
  
  return uniqueVars;
};

/**
 * Validate if a string is a valid JavaScript variable name
 * @param {string} name - Variable name to validate
 * @returns {boolean} True if valid
 */
export const isValidVariableName = (name) => {
  if (!name) return false;
  
  // Check if name matches JavaScript variable naming rules
  const validNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return validNameRegex.test(name);
};

/**
 * Parse text and return variables with their positions
 * @param {string} text - The input text
 * @returns {Array} Array of objects with variable info
 */
export const parseTextWithVariables = (text) => {
  const variables = [];
  if (!text) return variables;
  
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  let match;
  
  while ((match = variableRegex.exec(text)) !== null) {
    const variableName = match[1];
    if (isValidVariableName(variableName)) {
      variables.push({
        name: variableName,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        fullMatch: match[0]
      });
    }
  }
  
  return variables;
};