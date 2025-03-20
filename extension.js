// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const JustForFunProperty = {
  fontFamily: 0,
  fontSize: 1,
  fontAliasing: 2,
};
function updateFontFamily() {
  const isDark = vscode.window.activeColorTheme.kind === 2;
  const editorConfig = vscode.workspace.getConfiguration("editor");
  const preferredDarkFont =
    editorConfig.get("preferredDarkFont") || "JetBrains Mono,16,default";
  const preferredLightFont =
    editorConfig.get("preferredLightFont") ||
    "JetBrains Mono Medium,16,default";

  const darkProperties = String(preferredDarkFont).split(",");
  const lightProperties = String(preferredLightFont).split(",");
  const workbenchConfig = vscode.workspace.getConfiguration("workbench");

  const updateConfigs = [];

  updateConfigs.push(
    editorConfig.update(
      "fontFamily",
      isDark
        ? darkProperties[JustForFunProperty.fontFamily]
        : lightProperties[JustForFunProperty.fontFamily],
      vscode.ConfigurationTarget.Global,
      true
    )
  );

  updateConfigs.push(
    editorConfig.update(
      "fontSize",
      isDark
        ? Number(darkProperties[JustForFunProperty.fontSize])
        : Number(lightProperties[JustForFunProperty.fontSize]),
      vscode.ConfigurationTarget.Global,
      true
    )
  );

  updateConfigs.push(
    workbenchConfig.update(
      "fontAliasing",
      isDark
        ? darkProperties[JustForFunProperty.fontAliasing]
        : lightProperties[JustForFunProperty.fontAliasing],
      vscode.ConfigurationTarget.Global,
      true
    )
  );
  Promise.all(updateConfigs).then(
    () => {
      vscode.window.showInformationMessage("Success to update justforfun");
    },
    (error) => {
      vscode.window.showErrorMessage(`Fail to update justforfun: ${error}`);
    }
  );

  /*
  const workbenchConfig = vscode.workspace.getConfiguration("workbench");
  workbenchConfig
    .update(
      "fontAliasing",
      isDark ? "auto" : "default",
      vscode.ConfigurationTarget.Global,
      true
    )
    .then(
      () => {
        vscode.window.showInformationMessage("Update fontAliasing");
      },
      (error) => {
        vscode.window.showErrorMessage(`Fail to update fontAliasing: ${error}`);
      }
    );
    */
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "justforfun" is now active!');

  updateFontFamily();

  const watcherConfig = vscode.workspace.onDidChangeConfiguration(() => {
    updateFontFamily();
  });
  const watcher = vscode.window.onDidChangeActiveColorTheme(() => {
    updateFontFamily();
  });

  context.subscriptions.push(watcher);
  context.subscriptions.push(watcherConfig);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
