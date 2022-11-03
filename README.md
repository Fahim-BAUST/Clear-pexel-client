# Getting Started with Create React Native App

### Development OS
- Windows
### Target OS
- Android

## Installing dependencies
You will need Node, the React Native command line interface, a JDK, and Android Studio.
While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

You can find additional installation options on [Node's Downloads page](https://nodejs.org/en/download/) .

## Android development environment
Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

#### 1. Install Android Studio

[Download and install Android Studio](https://developer.android.com/studio) . While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- `If you are not already using Hyper-V: Performance (Intel ® HAXM) `

Then, click "Next" to install all of these components.

> If the checkboxes are grayed out, you will have a chance to install these components later on.

Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

#### 2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 12 (S) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "More Actions" button and select "SDK Manager".

![image](https://user-images.githubusercontent.com/53873688/199754420-09d0dbfe-5775-41f2-89ad-5280eb4052a6.png)

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 12 (S) entry, then make sure the following items are checked:

- Android SDK Platform 31
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
- Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the Android SDK Build-Tools entry, then make sure that `31.0.0` is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### 3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

- Open the **Windows Control Panel**.
- Click on **User Accounts**, then click **User Accounts** again
- Click on **Change my environment variables**
- Click on **New...** to create a new `ANDROID_HOME` user variable that points to the path to your Android SDK:

![download](https://user-images.githubusercontent.com/53873688/199756031-fc98dc70-8843-4c2e-b123-e5f2078f15a5.png)

The SDK is installed, by default, at the following location:

`%LOCALAPPDATA%\Android\Sdk`

You can find the actual location of the SDK in the Android Studio "Settings" dialog, under `Appearance & Behavior → System Settings → Android SDK `.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.
- Open powershell
- Copy and paste **Get-ChildItem -Path Env:\ into powershell**
- Verify ANDROID_HOME has been added

#### 4. Add platform-tools to Path
- Open the Windows Control Panel.
- Click on User Accounts, then click User Accounts again
- Click on Change my environment variables
- Select the Path variable.
- Click Edit.

Click New and add the path to platform-tools to the list.
The default location for this folder is:

`%LOCALAPPDATA%\Android\Sdk\platform-tools`
## React Native Command Line Interface
React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using npx, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.

## Creating a new application

If you previously installed a global `react-native-cli` package, please remove it as it may cause unexpected issues:
```
npm uninstall -g react-native-cli @react-native-community/cli
```

React Native has a built-in command line interface, which you can use to generate a new project. You can access it without installing anything globally using npx, which ships with Node.js. Let's create a new React Native project called "AwesomeProject":
```
npx react-native init AwesomeProject 
```

## [Optional] Using a specific version or template
If you want to start a new project with a specific React Native version, you can use the `--version` argument:
```
npx react-native init AwesomeProject --version X.XX.X
```
You can also start a project with a custom React Native template, like TypeScript, with `--template` argument:
```
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

## Preparing the Android device
You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

#### Using a physical device
If you have a physical Android device, you can use it for development in place of an AVD by plugging it in to your computer using a USB cable and following the instructions [here](https://reactnative.dev/docs/running-on-device).

#### Using a virtual device
If you use Android Studio to open ./AwesomeProject/android, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio.

## Running your React Native application

#### Step 1: Start Metro
First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—Metro Docs

To start Metro, run `npx react-native start` inside your React Native project folder:
```
npx react-native start
```
react-native start starts Metro Bundler.

#### Step 2: Start your application
Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:
```
npx react-native run-android
```
If everything is set up correctly, you should see your new app running in your Android emulator shortly.
