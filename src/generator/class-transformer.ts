import { ImportStatementParams, ParsedField } from './types';

export function decorateClassTransformers(field: ParsedField): string {
  let output = '';

  if (field.classTransforms?.includes('exclude')) {
    output += '@Exclude()\n';
  }

  return output;
}

export function makeImportsFromClassTransformer(
  fields: ParsedField[],
): ImportStatementParams[] {
  const hasExclude = fields.some((field) =>
    field.classTransforms?.includes('exclude'),
  );

  if (hasExclude) {
    return [{ from: 'class-transformer', destruct: ['Exclude'] }];
  }

  return [];
}
