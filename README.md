# Land App (React Native / Expo, Android)

Splash screen + home page with bordered "Land Measurement -> Sq feet to cents etc" button
+ converter screen (sq ft, sq yd, sq m, cent, ground, guntha, kuli, ma, are, acre, hectare).

## Run
    npm install
    npx expo install --fix      # aligns package versions with the installed Expo SDK
    npx expo start              # scan QR with Expo Go, or press "a" for emulator

## Build APK
    npm install -g eas-cli
    eas login
    eas build -p android --profile preview

## Notes
Kuli (144 sq ft) and Ma (14,400 sq ft) vary by region - verify against local records.
Edit src/units.js to change or add units.
