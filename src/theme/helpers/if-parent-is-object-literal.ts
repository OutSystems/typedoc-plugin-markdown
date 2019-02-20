import {
  DeclarationReflection,
  ReflectionKind,
} from 'typedoc/dist/lib/models/reflections/index';

export function ifParentIsObjectLiteral(member: DeclarationReflection, opts: any) {
  return member.parent && member.parent.kind === ReflectionKind.ObjectLiteral
    ? opts.fn(this)
    : opts.inverse(this);
}
