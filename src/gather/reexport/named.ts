import { ModuleInfo, PluginContext } from "rollup";
import * as parse from "../../parse";
import { gatherExports } from "../index";
import { ExportInfo, getImportedModule } from "./helpers";

export const gatherNamedReExports = async function* (
  ctx: PluginContext,
  reexported: parse.NamedReExport,
  mod: ModuleInfo
): AsyncGenerator<ExportInfo> {
  const importedMod = await getImportedModule(ctx, reexported.source, mod);
  if (!importedMod) return;

  const bindingsByImportedName = new Map<string, parse.ExportBinding>(
    reexported.bindings.map((binding) => [binding.importedName, binding])
  );

  for await (const exportInfo of gatherExports(ctx, importedMod)) {
    const binding = bindingsByImportedName.get(exportInfo.exportedName);
    if (!binding) continue;

    yield { ...exportInfo, exportedName: binding.exportedName };
  }
};
