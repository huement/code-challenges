# iOS Simulator Setup Guide

## Quick Start

Since you're using **Expo**, running on iOS Simulator is straightforward:

```bash
cd frontend-challenge
npm start
```

Then press **`i`** to open in iOS Simulator.

## Setup Checklist

### ✅ Required: Xcode Installation
- [x] Xcode is installed (found at `/Applications/Xcode.app`)
- [ ] Xcode Command Line Tools are properly configured
- [ ] iOS Simulator is accessible

### ⚠️ If simctl command doesn't work:

You may need to point Xcode command line tools to your Xcode installation:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

Then verify:
```bash
xcode-select -p
# Should output: /Applications/Xcode.app/Contents/Developer
```

### 🔧 First Time Setup Steps

1. **Open Xcode at least once:**
   ```bash
   open /Applications/Xcode.app
   ```
   - Accept the license agreement
   - Let it install additional components (this may take a few minutes)

2. **Verify iOS Simulators are installed:**
   - Open Xcode
   - Go to: Xcode → Settings → Platforms (or Components)
   - Make sure iOS Simulator is installed

3. **List available simulators:**
   ```bash
   xcrun simctl list devices available
   ```
   You should see a list of iPhone simulators.

### 🚀 Running Your App

1. **Start Expo:**
   ```bash
   npm start
   ```

2. **Open iOS Simulator:**
   - Press `i` in the terminal, OR
   - Open Simulator manually: Xcode → Open Developer Tool → Simulator, then press `i`

3. **Alternative - Direct launch:**
   ```bash
   npm run ios
   ```
   This will start Expo and launch the iOS simulator automatically.

### 🐛 Troubleshooting

**Issue: "xcrun: error: unable to find utility 'simctl'"**
- Solution: Run `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`

**Issue: "No iOS connected device found"**
- Solution: Make sure you've opened Xcode at least once and accepted the license
- Solution: Run `xcrun simctl list devices` to verify simulators are installed

**Issue: Expo can't find simulator**
- Solution: Open Simulator manually first: `open -a Simulator`
- Solution: Try `npm run ios` instead of `npm start` then `i`

**Issue: Build fails**
- Solution: Make sure you've run `npm install` in the project directory
- Solution: Check that Xcode is fully installed (may need to install additional components)

### 📱 Testing

Once running, you should see:
- Your app loads in the iOS Simulator
- The simulator shows an iPhone device
- Your tennis court app with the logo and menu button

### 💡 Tips

- Keep Xcode closed while using Expo (unless you need it)
- The simulator will stay open even if you restart Expo
- You can have multiple simulators open if needed
- Press `Cmd + R` in simulator to reload the app
- Press `Cmd + D` to open developer menu

