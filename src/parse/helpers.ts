import type * as t from "estree";
import assert from "node:assert/strict";
import type { AcornNode } from "rollup";

export const getStringLiteral = (node: t.Literal) => {
  assert.equal(typeof node.value, "string");
  return node.value as string;
};

export function assertProgram<T extends AcornNode & { sourceType?: string }>(
  node: T
): asserts node is T & t.Program & { sourceType: "module" } {
  assert.equal(node.type, "Program");
  assert.equal(node.sourceType, "module");
}
