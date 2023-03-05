export interface NamedSelfExport {
  from: "self";
  type: "named";
  exportedName: string;
}

export interface ExportBinding {
  importedName: string;
  exportedName: string;
}

export interface NamedReExport {
  from: "other";
  type: "named";
  source: string;
  bindings: ExportBinding[];
}

export interface BarrelReExport {
  from: "other";
  type: "barrel";
  source: string;
}

export type ParsedExportInfo = NamedSelfExport | NamedReExport | BarrelReExport;
