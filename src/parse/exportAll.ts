import * as t from "estree";
import { getStringLiteral } from "./helpers";
import { ParsedExportInfo } from "./types";

export const parseExportAll = function* (
  statement: t.ExportAllDeclaration
): Generator<ParsedExportInfo> {
  if (statement.exported) {
    yield {
      from: "self",
      type: "named",
      exportedName: statement.exported.name,
    };
  } else {
    yield {
      from: "other",
      type: "barrel",
      source: getStringLiteral(statement.source),
    };
  }
};
