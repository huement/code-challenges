# Court Images

## Where to put your images

Place your court images in this directory (`assets/images/`).

## Recommended Image Specifications

### Size Recommendations:
- **Width**: 1200-1600 pixels (for Retina displays)
- **Height**: 
  - **Card images**: 675-900 pixels (180px height × 3-5x for retina = ~675-900px)
  - **Hero images**: 1125-1500 pixels (300px height × 3-5x for retina = ~1125-1500px)

### Aspect Ratio:
- **Recommended**: 16:9 or 4:3 (landscape)
- The app uses `resizeMode: 'cover'`, so images will be cropped to fit
- Landscape images work best

### Format:
- **JPEG** for photos (smaller file size)
- **PNG** if you need transparency (not needed for court photos)

### Naming Convention:
Use descriptive names matching your courts:
- `wimbledon-park.jpg`
- `roland-garros.jpg`
- `forest-hills.jpg`
- `melbourne-academy.jpg`
- `barcelona-club.jpg`
- `tokyo-garden.jpg`

Or use IDs:
- `court-1.jpg`
- `court-2.jpg`
- etc.

## Current Usage:
- **Card images**: Displayed at 180px height (full width)
- **Hero images**: Displayed at 300px height (full width)
- Both use `cover` mode, so center of image is most important
