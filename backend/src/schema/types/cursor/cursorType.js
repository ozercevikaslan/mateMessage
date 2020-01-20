import Base64URL from 'base64-url';
import { GraphQLScalarType, Kind } from 'graphql';

export function toCursor({ value }) {
  return Base64URL.encode(value.toString());
}

export function fromCursor(string) {
  const value = Base64URL.decode(string);
  if (value) {
    return { value };
  } else {
    return null;
  }
}

const cursorType = new GraphQLScalarType({
  name: 'Cursor',
  serialize: value => {
    if (value.value) {
      return toCursor(value);
    }
    return null;
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return fromCursor(ast.value);
    }
    return null;
  },
  parseValue: value => {
    return fromCursor(value);
  }
});

export default cursorType;
