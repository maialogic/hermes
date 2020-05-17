module.exports = (api) => {
  api.cache(true);

  const plugins = [
    'module-resolver',
    {
      root: ['.'],
      alias: {
        $: './scripts',
        '@': './src',
      },
    },
  ];
  const presets = ['@babel/preset-typescript'];

  return {
    plugins,
    presets,
  };
};
