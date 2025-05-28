import type { API, FileInfo } from "jscodeshift";

const parameterToUpdate = "username";
const newParameterName = "aReallyCoolUsername";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // So this works for changing anything defined using 'let' 'const' 'var'
  const variableDeclarators = root.findVariableDeclarators("abc");
  variableDeclarators.renameTo("name");

  // Find all the functions
  const functions = root.find(j.Function);

  functions.forEach((funcPath) => {
    let hasBeenUpdated = false;
    const funcNode = funcPath.node;

    // Iterate through the parameters
    funcNode.params.forEach((parameter) => {
      if (
        // An Identifier is the name of a property
        j.Identifier.check(parameter) &&
        parameter.name === parameterToUpdate
      ) {
        parameter.name = newParameterName;
        hasBeenUpdated = true;
      }

      // Check for parameters defined using object syntax
      // e.g. functionName({myParam}: {myParam:string}) {}
      if (j.ObjectPattern.check(parameter)) {
        parameter.properties.forEach((innerProp) => {
          if (j.ObjectProperty.check(innerProp)) {
            if (
              j.Identifier.check(innerProp.key) &&
              innerProp.key.name === parameterToUpdate
            ) {
              innerProp.key.name = newParameterName;
              hasBeenUpdated = true;
            }

            if (
              j.Identifier.check(innerProp.value) &&
              innerProp.value.name === parameterToUpdate
            ) {
              innerProp.value.name = newParameterName;
              hasBeenUpdated = true;
            }
          }
        });

        if (j.TSTypeAnnotation.check(parameter.typeAnnotation)) {
          const { typeAnnotation } = parameter.typeAnnotation;
          if (j.TSTypeLiteral.check(typeAnnotation)) {
            typeAnnotation.members.forEach((member) => {
              if (j.TSPropertySignature.check(member)) {
                if (
                  j.Identifier.check(member.key) &&
                  member.key.name === parameterToUpdate
                ) {
                  member.key.name = newParameterName;
                }
              }
            });
          }
        }
      }
    });

    if (hasBeenUpdated) {
      // Go through the function body and update any references to the previously named variable
      j(funcNode.body)
        .find(j.Identifier)
        .forEach((innerFunctionReference) => {
          if (innerFunctionReference.node.name === parameterToUpdate) {
            innerFunctionReference.node.name = newParameterName;
          }
        });
    }
  });

  return root.toSource();
}
