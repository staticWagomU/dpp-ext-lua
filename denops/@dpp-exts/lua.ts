import {
  Actions,
  BaseExt,
  Plugin,
} from "https://deno.land/x/dpp_vim@v0.0.7/types.ts";
import { parseLua } from "./parseLua.ts";
import { Denops } from "https://deno.land/x/dpp_vim@v0.0.7/deps.ts";

type Params = Record<string, never>;

type LoadArgs = {
  path: string;
  options?: Partial<Plugin>;
};

type Lua = {
  ftplugins?: Record<string, string>;
  plugins?: Plugin[];
};

export class Ext extends BaseExt<Params> {
  override actions: Actions<Params> = {
    load: {
      description: "Load lua config",
      callback: async (args: {
        denops: Denops;
        actionParams: unknown;
      }) => {
        const params = args.actionParams as LoadArgs;
        const path = await args.denops.call(
          "dpp#util#_expand",
          params.path,
        ) as string;

        const luaFilelines = (await Deno.readTextFile(path)).split(
          /\r?\n/,
        );

        const lua = parseLua(luaFilelines, "{{{,}}}") as Lua;
        const defaultOptions = params.options ?? {};
        const plugins = (lua.plugins ?? []).map((plugin: Plugin) => {
          return {
            ...defaultOptions,
            ...plugin,
          };
        });

        return {
          ftplugins: lua.ftplugins,
          plugins: plugins,
        } satisfies Lua;
      },
    },
  };

  override params(): Params {
    return {};
  }
}
