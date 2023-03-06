import assert from "node:assert/strict";
import type { ModuleInfo, PluginContext } from "rollup";
import { parseExportAll } from "./exportAll";
import { parseExportDefault } from "./exportDefault";
import { parseExportNamed } from "./exportNamed";
import { assertProgram } from "./helpers";
import { ParsedExportInfo } from "./types";
export * from "./types";

export const parseExports = function* (
  ctx: PluginContext,
  mod: ModuleInfo
): Generator<ParsedExportInfo> {
  assert(mod.code != null, `Module ${mod.id} doesn't have associated code`);
  const node = ctx.parse(mod.code);
  assertProgram(node);

  for (const statement of node.body) {
    typeCheck: switch (statement.type) {
      case "ExportAllDeclaration": {
        yield* parseExportAll(statement);
        break typeCheck;
      }

      case "ExportDefaultDeclaration": {
        yield* parseExportDefault(statement);
        break typeCheck;
      }

      case "ExportNamedDeclaration": {
        yield* parseExportNamed(statement);
        break typeCheck;
      }
    }
  }
};
