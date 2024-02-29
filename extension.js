// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


function updateFontFamily() {
  const isDark = vscode.window.activeColorTheme.kind === 2;
  const editorConfig = vscode.workspace.getConfiguration("editor");
  const preferredDarkFont =
    editorConfig.get("preferredDarkFont") || "JetBrains Mono";
  const preferredLightFont =
    editorConfig.get("preferredLightFont") || "JetBrains Mono Medium";
  editorConfig
    .update(
      "fontFamily",
      isDark ? preferredDarkFont : preferredLightFont,
      vscode.ConfigurationTarget.Global,
      true
    )
    .then(
      () => {
        vscode.window.showInformationMessage("Update FontFamily");
      },
      (error) => {
        vscode.window.showErrorMessage(`Update FontFamily Failed : ${error}`);
      }
    );
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
