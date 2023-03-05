import { ModuleInfo } from "rollup";
import * as parse from "../parse";
import { ExportInfo } from "./reexport/helpers";

export const gatherNamedSelfExports = async function* (
  mod: ModuleInfo,
  exported: parse.NamedSelfExport
): AsyncGenerator<ExportInfo> {
  yield {
    id: mod.id,
    sourceName: exported.exportedName,
    exportedName: exported.exportedName,
  };
};
