const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");
const fs = require("fs");

const config = getDefaultConfig(__dirname);

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
];

const nativeWindConfig = withNativeWind(config, { input: "./src/global.css" });
const upstreamResolveRequest = nativeWindConfig.resolver.resolveRequest;

nativeWindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native-css-interop/jsx-runtime") {
    const filePath = path.resolve(
      __dirname,
      "node_modules/react-native-css-interop/dist/runtime/jsx-runtime.js"
    );
    if (fs.existsSync(filePath)) {
      return { filePath, type: "sourceFile" };
    }
  }
  if (moduleName === "react-native-css-interop/jsx-dev-runtime") {
    const filePath = path.resolve(
      __dirname,
      "node_modules/react-native-css-interop/dist/runtime/jsx-dev-runtime.js"
    );
    if (fs.existsSync(filePath)) {
      return { filePath, type: "sourceFile" };
    }
  }
  if (upstreamResolveRequest) {
    return upstreamResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = nativeWindConfig;
