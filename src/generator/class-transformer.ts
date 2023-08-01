import { ImportStatementParams, ParsedField } from './types';

export function decorateClassTransformers(field: ParsedField): string {
  let output = '';

  if (field.classTransforms?.includes('exclude')) {
    return '@Exclude()\n';
  }

  if (field.type === 'Decimal') {
    output += '@Type(() => String)\n';
  }

  return output;
}

export function makeImportsFromClassTransformer(
  fields: ParsedField[],
): ImportStatementParams[] {
  const hasExclude = fields.some((field) =>
    field.classTransforms?.includes('exclude'),
  );

  const hasType = fields.some((field) => field.type === 'Decimal');

  const destruct: string[] = [];

  if (hasExclude) destruct.push('Exclude');
  if (hasType) destruct.push('Type');

  if (destruct.length > 0) {
    return [{ from: 'class-transformer', destruct }];
  }

  return [];
}
