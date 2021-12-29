---
sidebar_label: 💡 Configuração
---

# 💡 Posso usar o vscode sem as configurações?

Com certeza, mas recomendamos que você use nossas configurações para aproveitar melhor o vscode.

## Configuração

```json title="vscode-settings.json"
{
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "git.autofetch": true,
  "cSpell.language": "en, pt, pt-BR",
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "markdown.preview.fontSize": 16,
  "cSpell.allowCompoundWords": true,
  "cSpell.userWords": [
    "csrf",
    "Cylon",
    "descriptografia",
    "geoip",
    "gridfs",
    "grupomave",
    "grupomavedigital",
    "linkedin",
    "MAVE",
    "modernizr",
    "otpauth",
    "Plyr",
    "Protheus",
    "qrcode",
    "totp",
    "TOTVS",
    "vcards",
    "WEBVTT"
  ],
  "workbench.editor.scrollToSwitchTabs": true,
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.letterSpacing": 1.5,
  "editor.fontWeight": "normal",
  "editor.snippetSuggestions": "bottom",
  "workbench.startupEditor": "welcomePage",
  "workbench.editor.enablePreview": true,
  "explorer.confirmDragAndDrop": true,
  "files.trimTrailingWhitespace": true,
  "files.trimFinalNewlines": true,
  // MacOS Only Settings.
  "terminal.integrated.macOptionIsMeta": true,
  // The default syntax (TextMate) highlighter classifies many tokens as variables and these are now (since VSCode 1.43) resolved into namespaces, classes, parameters, and so on. This is called Semantic highlighting support for TypeScript and JavaScript. But many themes and language extensions seem broken with single-colored syntax. This came as a surprise to me. It's set `true` by default. I recommend disabling this for now.
  "update.mode": "start",
  "tabnine.experimentalAutoImports": true,
  "cSpell.enableFiletypes": [
    "bat",
    "clojure",
    "coffeescript",
    "diff",
    "dockerfile",
    "dotenv",
    "fsharp",
    "git-rebase",
    "groovy",
    "hlsl",
    "ignore",
    "ini",
    "jsx-tags",
    "julia",
    "juliamarkdown",
    "kotlin",
    "log",
    "lua",
    "makefile",
    "objective-c",
    "objective-cpp",
    "ocaml",
    "perl",
    "perl6",
    "powershell",
    "properties",
    "r",
    "razor",
    "ruby",
    "scminput",
    "search-result",
    "shaderlab",
    "shellscript",
    "sql",
    "swift",
    "vb",
    "vcard",
    "xml",
    "xsl"
  ],
  "editor.renderControlCharacters": true,
  "editor.renderLineHighlight": "all",
  "editor.renderLineHighlightOnlyWhenFocus": true,
  "editor.renderWhitespace": "all",
  "markdown.preview.breaks": true,
  "editor.minimap.showSlider": "always",
  "diffEditor.codeLens": true,
  "workbench.preferredDarkColorTheme": "Default High Contrast",
  "workbench.view.alwaysShowHeaderActions": true,
  "editor.mouseWheelZoom": true,
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "beautify.language": {
    "typescript": {
      "type": ["typescript", "ts"],
      "filename": [".ts", ".d.ts"]
    },
    "js": {
      "type": ["javascript", "json", "jsonc"],
      "filename": [".jshintrc", ".jsbeautifyrc"]
    },
    "css": ["css", "less", "scss"],
    "html": ["htm", "html"]
  },
  "editor.defaultFormatter": "HookyQR.beautify",
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "github.copilot.autocomplete.enable": true,
  "redhat.telemetry.enabled": true,
  "[dockercompose]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "security.workspace.trust.untrustedFiles": "newWindow",
  "[graphql]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.productIconTheme": "fluent-icons",
  "workbench.iconTheme": "material-icon-theme",
  "security.workspace.trust.banner": "always",
  "security.workspace.trust.startupPrompt": "always",
  "highlight.regexes": {
    "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *TODO(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
      "filterFileRegex": ".*(?<!CHANGELOG.md)$",
      "decorations": [
        {
          "overviewRulerColor": "#ffcc00",
          "backgroundColor": "#ffcc00",
          "color": "#1f1f1f",
          "fontWeight": "bold"
        },
        {
          "backgroundColor": "#ffcc00",
          "color": "#1f1f1f"
        }
      ]
    },
    "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *(?:FIXME|FIX|BUG|UGLY|DEBUG|HACK)(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
      "filterFileRegex": ".*(?<!CHANGELOG.md)$",
      "decorations": [
        {
          "overviewRulerColor": "#cc0000",
          "backgroundColor": "#cc0000",
          "color": "#1f1f1f",
          "fontWeight": "bold"
        },
        {
          "backgroundColor": "#cc0000",
          "color": "#1f1f1f"
        }
      ]
    },
    "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *(?:REVIEW|OPTIMIZE|TSC)(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
      "filterFileRegex": ".*(?<!CHANGELOG.md)$",
      "decorations": [
        {
          "overviewRulerColor": "#00ccff",
          "backgroundColor": "#00ccff",
          "color": "#1f1f1f",
          "fontWeight": "bold"
        },
        {
          "backgroundColor": "#00ccff",
          "color": "#1f1f1f"
        }
      ]
    },
    "((?:<!-- *)?(?:#|// @|//|./\\*+|<!--|--|\\* @|{!|{{!--|{{!) *(?:IDEA)(?:\\s*\\([^)]+\\))?:?)((?!\\w)(?: *-->| *\\*/| *!}| *--}}| *}}|(?= *(?:[^:]//|/\\*+|<!--|@|--|{!|{{!--|{{!))|(?: +[^\\n@]*?)(?= *(?:[^:]//|/\\*+|<!--|@|--(?!>)|{!|{{!--|{{!))|(?: +[^@\\n]+)?))": {
      "filterFileRegex": ".*(?<!CHANGELOG.md)$",
      "decorations": [
        {
          "overviewRulerColor": "#cc00cc",
          "backgroundColor": "#cc00cc",
          "color": "#1f1f1f",
          "fontWeight": "bold"
        },
        {
          "backgroundColor": "#cc00cc",
          "color": "#1f1f1f"
        }
      ]
    }
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.associations": {
    "*.env.development.local": "env",
    "*.env.production.local": "env",
    "*.env.*.local": "env",
    "*.env.local": "env"
  },
  "[env]": {
    "editor.defaultFormatter": "IronGeek.vscode-env"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "better-comments.highlightPlainText": true,
  "better-comments.tags": [
    {
      "tag": "!",
      "color": "#FF9B98",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "?",
      "color": "#3498DB",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "//",
      "color": "#474747",
      "strikethrough": true,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "todo",
      "color": "#FF8C00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "*",
      "color": "#98C379",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    }
  ],
  "editor.fontSize": 16,
  "workbench.colorTheme": "Dracula Soft",
  "explorer.confirmDelete": false,
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "markdown": true
  },
  "window.zoomLevel": -1
}
```

[vscode-settings.json](https://gist.githubusercontent.com/GuilhermeSantos001/80546da278e94fd0b5fc6a59a60cdf1e/raw/2621d8c38b0b05dbb67eff78bdefa9891b7cfee9/vscode-settings.json)

## Extensões

[Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

[Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)

[Brazilian Portuguese - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-portuguese-brazilian)

[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

[DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

[Dracula Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)

[ENV](https://marketplace.visualstudio.com/items?itemName=IronGeek.vscode-env)

[Fluent Icons](https://marketplace.visualstudio.com/items?itemName=miguelsolorio.fluent-icons)

[GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

[GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

[GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

[JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

[Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)

[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

[npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)

[npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

[Omni Theme](https://marketplace.visualstudio.com/items?itemName=rocketseat.theme-omni)

[Portuguese (Brazil) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-pt-BR)

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

[pug (jade) formatter](https://marketplace.visualstudio.com/items?itemName=ducfilan.pug-formatter)

[Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

[SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)

[Split HTML Attributes (Vue, React, Angular)](https://marketplace.visualstudio.com/items?itemName=dannyconnell.split-html-attributes)

[Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

[vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Outros

### Código Fonte TV

23 Extensões do VS Code para 2020 // Mão no Código #25

[![23 Extensões do VS Code para 2020 // Mão no Código #25](https://img.youtube.com/vi/tmgpF7Bn3_E/0.jpg)](https://www.youtube.com/watch?v=tmgpF7Bn3_E)

### Filipe Deschamps

Programar Mais Rápido e Ser Mais Produtivo no Visual Studio Code (VSCode)

[![Programar Mais Rápido e Ser Mais Produtivo no Visual Studio Code (VSCode)](https://img.youtube.com/vi/FCC2GbStmfc/0.jpg)](https://www.youtube.com/watch?v=FCC2GbStmfc)
