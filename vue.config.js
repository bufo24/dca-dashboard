module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "https://bitvavo.jjdev.nl:3443/"
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
