import { extractAssignedNames } from "@rollup/pluginutils";
import * as t from "estree";
import assert from "node:assert/strict";
import { getStringLiteral } from "./helpers";
import { ParsedExportInfo } from "./types";

const exportName = function* (
  statement: t.ExportNamedDeclaration
): Generator<string> {
  switch (statement.declaration?.type) {
    case "ClassDeclaration":
    case "FunctionDeclaration": {
      const id = statement.declaration.id;
      assert(id, `Expected class/function to have a name`);
      yield id.name;
      break;
    }

    case "VariableDeclaration": {
      for (const declarator of statement.declaration.declarations) {
        yield* extractAssignedNames(declarator.id);
      }
      break;
    }
  }
};

export function* parseExportNamed(
  statement: t.ExportNamedDeclaration
): Generator<ParsedExportInfo> {
  if (statement.declaration) {
    for (const exportedName of exportName(statement)) {
      yield { from: "self", type: "named", exportedName };
    }
  } else {
    if (statement.source) {
      yield {
        from: "other",
        type: "named",
        source: getStringLiteral(statement.source),
        bindings: statement.specifiers.map((specifier) => ({
          importedName: specifier.local.name,
          exportedName: specifier.exported.name,
        })),
      };
    } else {
      for (const specifier of statement.specifiers) {
        yield {
          from: "self",
          type: "named",
          exportedName: specifier.exported.name,
        };
      }
    }
  }
}
