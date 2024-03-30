# dpp-ext-lua

This ext implements lua loading.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### dpp.vim

https://github.com/Shougo/dpp.vim

## Configuration

```typescript
type Toml = {
  ftplugins?: Record<string, string>;
  hooks_file?: string;
  multiple_plugins?: Plugin[] & {
    plugins: string[];
  };
  plugins?: Plugin[];
};

const [context, options] = await args.contextBuilder.get(args.denops);

const luaPlugins = await args.dpp.extAction(
  args.denops,
  context,
  options,
  "lua",
  "load",
  {
    path: luaPath,
    options: {
      lazy: false,
    },
  },
) as Lua | undefined;

```
