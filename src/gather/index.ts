import type { ModuleInfo, PluginContext } from 'rollup';
import * as parse from '../parse';
import { gatherBarrelReExports } from './reexport/barrel';
import { ExportInfo } from './reexport/helpers';
import { gatherNamedReExports } from './reexport/named';
import { gatherNamedSelfExports } from './self';

export const gatherExports = async function* (
  ctx: PluginContext,
  mod: ModuleInfo,
): AsyncGenerator<ExportInfo> {
  for (const exported of parse.parseExports(ctx, mod)) {
    if (exported.from === 'self') {
      yield* gatherNamedSelfExports(mod, exported);
    } else {
      if (exported.type === 'barrel') {
        yield* gatherBarrelReExports(ctx, exported, mod);
      } else {
        yield* gatherNamedReExports(ctx, exported, mod);
      }
    }
  }
};
