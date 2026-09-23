# Arsip PPB XII RPL 2026/2027

|                    |                                |
| -----------------: | ------------------------------ |
| **Mata Pelajaran** | Pemrograman Perangkat Bergerak |
|          **Kelas** | XII RPL                        |
|      **Framework** | Expo React Native              |

## Link .PDF Materi

https://drive.google.com/drive/folders/1U9wofretIouc3VQ1MzM2xFugH1QS6yFx?usp=sharing

## Install Project

```
npm install
```

## Jalankan Project di Web

```
npm run web
```

## Install SQLite

> SQLite akan error "sqlite3_open_v2" di browser Chrome-based. Gunakan Firefox atau Expo Go (Android)

```
npx expo install expo-sqlite
npx expo customize metro.config.js
```

Edit `metro.config.js`, tambahkan code berikut diatas `module.exports = config;`

```
// Add wasm asset support
config.resolver.assetExts.push('wasm');

// Add COEP and COOP headers to support SharedArrayBuffer
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    middleware(req, res, next);
  };
};
```
