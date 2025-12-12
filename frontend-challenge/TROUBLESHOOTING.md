# Troubleshooting Guide

## Error: Cannot find native module 'ExpoLinking'

### Solution:
1. **Stop the Metro bundler** (Ctrl+C in terminal)
2. **Clear the cache and restart:**
   ```bash
   npm start -- --clear
   ```
3. **Reload the app:**
   - In Expo Go: Shake your device → "Reload"
   - Or close and reopen Expo Go, then scan QR code again

### If still not working:
Try these steps in order:

1. **Clear all caches:**
   ```bash
   npm start -- --clear
   ```

2. **Reinstall node_modules:**
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

3. **Restart Expo Go app completely:**
   - Force close Expo Go on your phone
   - Reopen it
   - Scan QR code again

## Error: "main" has not been registered

This usually means:
- Metro bundler needs to be restarted
- The app cache needs to be cleared
- Expo Go needs to be reloaded

**Quick fix:**
1. Stop Metro (Ctrl+C)
2. Run: `npm start -- --clear`
3. Reload app in Expo Go
