import assert from "node:assert/strict";
import { ModuleInfo, PluginContext } from "rollup";

export interface ExportInfo {
  id: string;
  sourceName: string;
  exportedName: string;
}

export const getImportedModule = async function (
  ctx: PluginContext,
  source: string,
  importer: ModuleInfo
) {
  const importedId = await ctx.resolve(source, importer.id);
  assert(importedId, `Rollup can't resolve ${source} from ${importer.id}`);

  if (importedId.external) return null;

  const importedMod = await ctx.load(importedId);
  assert(importedMod, `Rollup doesn't have a module for id ${importedId.id}`);
  return importedMod;
};
