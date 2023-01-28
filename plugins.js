module.exports = async () => {
  const { remarkKroki } = await import("remark-kroki");
  return {
    getRemarkPlugins() {
      return [[remarkKroki, { server: "https://kroki.io" }]];
    },
  };
};
