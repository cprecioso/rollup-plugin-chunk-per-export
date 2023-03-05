import { ModuleInfo, PluginContext } from "rollup";
import * as parse from "../../parse";
import { gatherExports } from "../index";
import { ExportInfo, getImportedModule } from "./helpers";

export const gatherBarrelReExports = async function* (
  ctx: PluginContext,
  reexported: parse.BarrelReExport,
  mod: ModuleInfo
): AsyncGenerator<ExportInfo> {
  const importedMod = await getImportedModule(ctx, reexported.source, mod);
  if (!importedMod) return;

  yield* gatherExports(ctx, importedMod);
};
