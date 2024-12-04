import { DeclarationReflection, Reflection, SignatureReflection, TypeParameterReflection } from 'typedoc'

export function hasTypeParameters(
  reflection: Reflection,
): reflection is Reflection & { typeParameters: TypeParameterReflection[] } {
  return (
    (reflection instanceof DeclarationReflection || reflection instanceof SignatureReflection) &&
    reflection.typeParameters != null &&
    reflection.typeParameters.length > 0
  )
}
