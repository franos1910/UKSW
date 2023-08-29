
```
MyApp
├─ .buckconfig
├─ .bundle
│  └─ config
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ .ruby-version
├─ .watchmanconfig
├─ android
│  ├─ app
│  │  ├─ build_defs.bzl
│  │  ├─ proguard-rules.pro
│  │  ├─ src
│  │  │  ├─ debug
│  │  │  │  ├─ AndroidManifest.xml
│  │  │  │  └─ java
│  │  │  │     └─ com
│  │  │  │        └─ myapp
│  │  │  │           └─ ReactNativeFlipper.java
│  │  │  └─ main
│  │  │     ├─ AndroidManifest.xml
│  │  │     ├─ java
│  │  │     │  └─ com
│  │  │     │     └─ myapp
│  │  │     │        ├─ MainActivity.java
│  │  │     │        ├─ MainApplication.java
│  │  │     │        └─ newarchitecture
│  │  │     │           ├─ components
│  │  │     │           │  └─ MainComponentsRegistry.java
│  │  │     │           ├─ MainApplicationReactNativeHost.java
│  │  │     │           └─ modules
│  │  │     │              └─ MainApplicationTurboModuleManagerDelegate.java
│  │  │     ├─ jni
│  │  │     │  ├─ CMakeLists.txt
│  │  │     │  ├─ MainApplicationModuleProvider.cpp
│  │  │     │  ├─ MainApplicationModuleProvider.h
│  │  │     │  ├─ MainApplicationTurboModuleManagerDelegate.cpp
│  │  │     │  ├─ MainApplicationTurboModuleManagerDelegate.h
│  │  │     │  ├─ MainComponentsRegistry.cpp
│  │  │     │  ├─ MainComponentsRegistry.h
│  │  │     │  └─ OnLoad.cpp
│  │  │     └─ res
│  │  │        ├─ drawable
│  │  │        │  └─ rn_edit_text_material.xml
│  │  │        ├─ mipmap-hdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-mdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-xhdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-xxhdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-xxxhdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        └─ values
│  │  │           ├─ strings.xml
│  │  │           └─ styles.xml
│  │  └─ _BUCK
│  ├─ gradle
│  │  └─ wrapper
│  │     ├─ gradle-wrapper.jar
│  │     └─ gradle-wrapper.properties
│  ├─ gradle.properties
│  ├─ gradlew
│  └─ gradlew.bat
├─ app.json
├─ App.tsx
├─ babel.config.js
├─ Gemfile
├─ index.js
├─ ios
│  ├─ MyApp
│  │  ├─ AppDelegate.h
│  │  ├─ AppDelegate.mm
│  │  ├─ Images.xcassets
│  │  │  ├─ AppIcon.appiconset
│  │  │  │  └─ Contents.json
│  │  │  └─ Contents.json
│  │  ├─ Info.plist
│  │  ├─ LaunchScreen.storyboard
│  │  └─ main.m
│  ├─ MyApp.xcodeproj
│  │  ├─ project.pbxproj
│  │  └─ xcshareddata
│  │     └─ xcschemes
│  │        └─ MyApp.xcscheme
│  ├─ MyAppTests
│  │  ├─ Info.plist
│  │  └─ MyAppTests.m
│  ├─ Podfile
│  └─ _xcode.env
├─ metro.config.js
├─ package-lock.json
├─ package.json
├─ src
│  ├─ assets
│  │  ├─ img
│  │  │  ├─ france.png
│  │  │  ├─ france_big.png
│  │  │  ├─ home.png
│  │  │  ├─ home_big.png
│  │  │  ├─ poland.png
│  │  │  ├─ poland_big.png
│  │  │  ├─ spain.png
│  │  │  ├─ spain_big.png
│  │  │  ├─ sport_big.png
│  │  │  ├─ uk.png
│  │  │  └─ uk_big.png
│  │  └─ json
│  │     ├─ home.json
│  │     └─ sport.json
│  ├─ features
│  │  ├─ game
│  │  │  ├─ components
│  │  │  ├─ logic
│  │  │  │  └─ GameLogic.ts
│  │  │  └─ screens
│  │  │     └─ GameScreen.tsx
│  │  ├─ home
│  │  │  ├─ components
│  │  │  │  └─ HomeScreenCard.tsx
│  │  │  └─ screens
│  │  │     ├─ CategoryScreen.tsx
│  │  │     └─ HomeScreen.tsx
│  │  └─ profile
│  │     └─ screens
│  │        ├─ KnownWords.tsx
│  │        ├─ ProfileInfoScreen.tsx
│  │        └─ ProfileScreen.tsx
│  ├─ navigation
│  │  ├─ AppNavigator.tsx
│  │  └─ SplashScreen.tsx
│  ├─ redux
│  │  ├─ slice
│  │  │  ├─ game-slice.ts
│  │  │  ├─ main-slice.ts
│  │  │  └─ user-slice.ts
│  │  └─ store.tsx
│  ├─ ui
│  │  ├─ AppButton.tsx
│  │  ├─ AppInput.tsx
│  │  ├─ AppModal.tsx
│  │  ├─ AppSelect.tsx
│  │  ├─ AppText.tsx
│  │  ├─ Column.tsx
│  │  ├─ ErrorText.tsx
│  │  ├─ FlagSwitcher.tsx
│  │  ├─ FlexBox.tsx
│  │  ├─ HeaderBar.tsx
│  │  └─ Row.tsx
│  └─ utils
│     ├─ asyncStorage.ts
│     ├─ contsants.ts
│     ├─ locales
│     │  ├─ en.ts
│     │  ├─ es.ts
│     │  ├─ fr.ts
│     │  ├─ pl.ts
│     │  └─ string.ts
│     └─ theme.ts
├─ tsconfig.json
├─ yarn.lock
├─ _node-version
└─ __tests__
   └─ App-test.tsx

```