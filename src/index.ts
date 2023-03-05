import { gatherExports } from "./gather";

const chunkPerExport: typeof import("..").default = ({
  preserveChunkSignature = false,
} = {}) => ({
  name: "rollup-plugin-chunk-per-export",

  moduleParsed: {
    order: "post",
    async handler(mod) {
      if (!mod.isEntry) return;

      for await (const exported of gatherExports(this, mod)) {
        if (exported.id === mod.id) continue;

        this.emitFile({
          type: "chunk",
          id: exported.id,
          preserveSignature: preserveChunkSignature,
          name: exported.exportedName,
        });
      }
    },
  },
});

export default chunkPerExport;
