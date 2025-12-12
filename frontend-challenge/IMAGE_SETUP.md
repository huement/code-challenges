# Image Setup Guide

## 1. Where to Put Images

Put your images in: **`assets/images/`**

```
frontend-challenge/
└── assets/
    └── images/
        ├── wimbledon-park.jpg
        ├── roland-garros.jpg
        ├── forest-hills.jpg
        ├── melbourne-academy.jpg
        ├── barcelona-club.jpg
        └── tokyo-garden.jpg
```

## 2. Image Size Recommendations

### Dimensions:
- **Width**: 1200-1600 pixels
- **Height**: 
  - **675-900 pixels** (optimized for card display at 180px height)
  - **1125-1500 pixels** (optimized for hero display at 300px height)
  
  *Higher resolution images work fine - React Native will scale them down*

### Aspect Ratio:
- **16:9** or **4:3** landscape works best
- Images use `cover` mode, so they'll be cropped to fit
- Keep important content (the court) in the center

### Format:
- **JPEG** (.jpg) recommended for photos (smaller file size)
- **PNG** (.png) if you need transparency

## 3. How to Update the Data

After adding your images, update `data/courts.ts`:

**Change from:**
```typescript
image: 'https://images.unsplash.com/photo-...',
```

**To:**
```typescript
image: require('../assets/images/your-image-name.jpg'),
```

**Example:**
```typescript
{
  id: '1',
  name: 'Wimbledon Park Courts',
  image: require('../assets/images/wimbledon-park.jpg'),
  // ... rest of court data
}
```

## 4. After Adding Images

1. Save your images in `assets/images/`
2. Update `data/courts.ts` with `require()` statements
3. Restart Metro bundler if needed:
   ```bash
   npm start -- --clear
   ```
4. Reload the app

## Notes

- Image paths in `require()` are relative to the `courts.ts` file
- The app now supports both URLs (strings) and local images (require numbers)
- Images are automatically optimized by React Native
- File names are case-sensitive on some systems
