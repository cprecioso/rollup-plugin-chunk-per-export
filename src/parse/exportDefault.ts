import * as t from "estree";
import { ParsedExportInfo } from "./types";

export function* parseExportDefault(
  _statement: t.ExportDefaultDeclaration
): Generator<ParsedExportInfo> {
  yield { from: "self", type: "named", exportedName: "default" };
}
