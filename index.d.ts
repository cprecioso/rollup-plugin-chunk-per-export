import type { Plugin, PreserveEntrySignaturesOption } from "rollup";

declare const chunkPerExport: (options?: {
  /** @default false */
  preserveChunkSignature?: PreserveEntrySignaturesOption;
}) => Plugin;
export default chunkPerExport;
