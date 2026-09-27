## Crash Bombs 
React Native Game


:white_check_mark: Sing in and Sing up with Supabase.

:white_check_mark: Home Screen, Menu Screen and Game Screen.

:white_check_mark: Profile Info Bottom Modal.

:white_check_mark: Basic Game Engine. 

:white_check_mark: Do the website :fire:

:white_check_mark: Sing in and Sing up with Google.  

:exclamation: Sing in and Sing up with Apple ID.  

:exclamation: Create warning text for Game Over - When your are logged in ? do not save the score.  


 
<p float="left">


![Screenshot from 2025-04-22 19-55-32](https://github.com/user-attachments/assets/adea1975-0301-47c0-8774-bca5cd5997bd)
![Screenshot from 2025-04-22 19-54-26](https://github.com/user-attachments/assets/ecfef707-daf3-4e55-9cb6-99307f9e5c71)
![Screenshot from 2025-04-22 19-53-57](https://github.com/user-attachments/assets/5cfea904-d7d1-4935-b367-df0e02e626cd)
![Screenshot from 2025-04-22 19-53-09](https://github.com/user-attachments/assets/e3c2c940-bb0e-415b-b1a3-06eef4315608)

   


</p>

## Overview

Crash Bombs is a React Native (Expo) mobile game. Players match falling shape/color
symbols against two mode buttons (blue/red) and three shapes (triangle/square/circle)
before they hit the ground; missing too many ends the game. It has Supabase-backed
auth (email/password) and a leaderboard (best score, ranking).

## Commands

```bash
npm start          # expo start — Metro bundler + dev menu (scan QR with Expo Go)
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web        # expo start --web
```

There is no test suite and no lint/format npm script configured. `biome.json` exists
(tab indentation, width 4, double quotes, line width 140) but `@biomejs/biome` is not
a listed dependency — run it via `npx @biomejs/biome check .` / `npx @biomejs/biome format --write .`
if needed. TypeScript type-checking: `npx tsc --noEmit`.

EAS build profiles (`eas.json`): `development`, `preview`, `production` — invoked via
`eas build --profile <name>` (requires EAS CLI/login).

## Required local file not in git

`src/utils/supabase.ts` is gitignored (see `.gitignore`, `#supbase` section) and is
**not present in the repository**. Every data hook (`useProfile`, `useSafeMessage`,
`useEndDate`, `useTopUsers`, `useUpdateProfile`), `Menu.tsx`, `Account.tsx`,
`AuthEmail.tsx`, and the Game screen import `supabase` from `@src/utils/supabase` /
`src/utils/supabase`. Without this file (a `createClient(url, anonKey)` export from
`@supabase/supabase-js`), the app will not build. Create a minimal one locally before
touching auth/data code if it's missing.

## Architecture

**Entry chain**: `index.ts` → `App.tsx` → `Menu.tsx`. `App.tsx` wires up the Redux
`Provider`, `styled-components` `ThemeProvider` (`darkTheme`), and blocks rendering
until fonts load (`useFontsAndLayout`).

**`Menu.tsx` is the de facto router.** There is no navigation library in use; screen
switching is local `useState<Screens>` toggling between `Home` and `Game`
(`src/utils/constants.ts` → `Screens` enum). `Menu.tsx` also owns the Supabase auth
session (`supabase.auth.getSession` / `onAuthStateChange`) and fans out several
independent data-fetching hooks that all hit Supabase directly:
- `useProfile` — current user's profile row (`profiles` table)
- `useSafeMessage` — a kill-switch/banner flag (`endDate.safe_message`)
- `useEndDate` — a countdown target the Home screen renders (`endDate.end_date`)
- `useTopUsers` — top-5 leaderboard (`profiles` ordered by `bestscore`)

**State layers, and why there are two:**
- Redux (`src/store/redux`) holds only a `user` slice (`name`, `email`) — largely
  vestigial; most user data actually flows as props from the Supabase hooks above,
  not through Redux.
- `useAppState` (`src/hooks/useAppState.ts`) hydrates the Redux store from
  `AsyncStorage` on mount (`loadState`) and persists on every store change
  (`store.subscribe(() => saveState(...))`), via `src/store/async/*`.
- Supabase is the actual source of truth for auth/profile/leaderboard data; Redux/
  AsyncStorage do not currently mirror it.

**Game screen (`src/screens/Game/index.tsx`) is a self-contained implementation** —
falling symbols are plain `Animated.Image`s driven by `Animated.timing`, with
difficulty (spawn `frequency` and fall `speed`) recalculated each time `count`
(score) changes via `calculateFrecuency`/`calculateGameSettingSpeed`. It does not use
`react-native-game-engine` or `matter-js` despite both being dependencies.

**`src/screens/Game/entities/`, `src/screens/Game/components/{Bird,Floor,Obstacle}.js`,
and `src/screens/Game/utils/random.js` are dead code** — a Flappy-Bird-style
Matter.js prototype that nothing imports. Likewise the repo-root `sample.ts`,
`constants.ts`, and `types.ts` are an unused Reanimated brick-breaker prototype, and
`src/components/Account.tsx` (a Supabase profile-editing form) is unreferenced by any
screen. Don't extend these assuming they're live — confirm with a grep for importers
before building on any of them.

**Path aliases** (kept in sync between `tsconfig.json` `paths` and `.babelrc`
`module-resolver`): `@src/*`, `@assets/*`, `@hooks/*`, `@store/*`, `@themes/*`,
`@screens/*`, `@components/*`, `@translations/*`. Some older files use bare
`src/utils/...` / `store/redux` imports (no `@`) instead — both resolve, but prefer
the aliased form in new code.

**Styling**: `styled-components/native`, one `styled.tsx` file per component
directory next to `index.tsx` (e.g. `Header/index.tsx` + `Header/styled.tsx`). Theme
shape is declared in `src/themes/index.ts` (`DefaultTheme` module augmentation);
`lightTheme` and `darkTheme` currently have identical values. Responsive sizing goes
through `src/utils/scaleFunctions.ts` (`scale`/`verticalScale`/`moderateScale` against
a 350×680 guideline size), not raw dimensions.

**i18next/react-i18next are dependencies with a `src/translations/resources.ts`
resource table, but `i18next.init(...)` is never called anywhere** — translations are
not actually wired up yet.

**Assets**: control button/shape images and life indicators live under
`assets/controls/`; game sound effects under `assets/sounds/` (played via `expo-av`
`Audio.Sound` in the Game screen).
