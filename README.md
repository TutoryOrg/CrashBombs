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

---

## What it is

Crash Bombs is an Expo / React Native game: colored/shaped symbols (triangle, square,
circle in blue or red) fall down the screen and the player must tap the matching
mode + shape button before each symbol lands, up to 3 misses. Score, best score and
a global top-5 leaderboard are backed by Supabase; login is optional (guests can
play, but only logged-in users can appear on the leaderboard).

## Tech stack

| Concern | Package | Notes |
|---|---|---|
| App framework | `expo` ~52, `react-native` 0.76.6, `react` 18.3.1 | New Architecture enabled (`app.json` → `newArchEnabled: true`) |
| Language | TypeScript ~5.3.3 | `strict: true`; three legacy files (`Game/entities/**`, `Game/components/**`, `Game/utils/random.js`) are plain `.js` |
| Backend / auth / DB | `@supabase/supabase-js` | Email+password auth, `profiles` and `endDate` tables — see [Backend](#backend-supabase) |
| Global state | `@reduxjs/toolkit`, `react-redux`, `@redux-devtools/core` | One slice (`user`), persisted to disk — see [State management](#state-management) |
| Persistence | `@react-native-async-storage/async-storage` | Backs the Redux persistence layer |
| Server-state/data fetching | `@tanstack/react-query` | Wrapped by `useQueryService`/`useMutationService` in `src/hooks/useService.ts`, but **not currently used by any screen** (all Supabase calls in `src/hooks/use*.ts` are hand-rolled `useState`/`useEffect`, not React Query) |
| Styling | `styled-components` 6.1.15 (`/native`) | One `styled.tsx` per component, theme-driven — see [Styling system](#styling-system) |
| UI kit | `@rneui/base`, `@rneui/themed` | Used only by `AuthEmail` (`Input`/`Button`) |
| Bottom sheet | `@gorhom/bottom-sheet` | Powers the "Player Info" modal opened from `Header`/`Buttons` |
| Avatars | `@dicebear/core`, `@dicebear/collection` (`avataaarsNeutral`) | Deterministic SVG avatar generated from `user.avatar_url` as a seed, rendered with `react-native-svg`'s `SvgXml` |
| Animation | `react-native-reanimated`, `react-native-gesture-handler` | Reanimated is required by `.babelrc`'s plugin list and by the (unused) `sample.ts` prototype; the live Game screen animates with the plain RN `Animated` API instead |
| Sound | `expo-av` | 4 short SFX (`assets/sounds/sound_1..4.mp3`) played via `Audio.Sound` in the Game screen |
| Fonts / splash | `expo-font`, `expo-splash-screen` | See [Fonts & splash](#fonts--splash) |
| i18n | `i18next`, `react-i18next` | Present as a dependency with a resource table (`src/translations/resources.ts`) but **`i18next.init()` is never called** — no screen actually uses translations yet |
| Physics (unused) | `matter-js`, `react-native-game-engine` | Only referenced by the dead Flappy-Bird prototype under `src/screens/Game/{entities,components,utils}` — see [Known dead/broken code](#known-deadbroken-code) |
| Utilities | `lodash` | |
| Formatting/linting | `biome.json` config (tabs, width 4, double quotes) | `@biomejs/biome` isn't in `package.json`; run via `npx @biomejs/biome check .` |

## Repository structure

```
.
├── App.tsx                    # Root component: Redux Provider, ThemeProvider, font gate
├── index.ts                   # Expo entry point (registerRootComponent)
├── app.json                   # Expo app config (bundle ids, splash, icons, EAS project id)
├── eas.json                   # EAS Build profiles: development / preview / production
├── metro.config.js            # Default Expo Metro config (customization commented out)
├── biome.json                 # Formatter/linter config (tabs, 4-width, double quotes)
├── tsconfig.json               # extends expo/tsconfig.base; declares the "@..." path aliases
├── .babelrc                    # babel-preset-expo + reanimated plugin + module-resolver (mirrors tsconfig paths)
│
├── assets/
│   ├── controls/               # PNG+SVG art for shape/mode buttons and life indicators
│   ├── fonts/                  # KOMIKAX_, LuckiestGuy, ObelixPro family, komi.ttf
│   ├── sounds/                 # sound_1..4.mp3 (hit / success / missed / game-over SFX)
│   ├── icon.png, splash_screen.png, star.png, user.png, ...  # misc app/UI images
│   └── explosion*.gif          # unused-looking leftover assets
│
├── design/                     # Reference mockups (BottomInfo/BottomLogIn/BottomSingUp/Home*.png) — design hand-off, not consumed by code
│
├── src/
│   ├── components/              # Reusable, presentational pieces. Convention: Foo/index.tsx + Foo/styled.tsx
│   │   ├── Text.tsx              # Base styled.Text primitives: TextObelix, TextKomi, TextLucky (one per custom font)
│   │   ├── Container.tsx         # ContainerColumn / ContainerRow flex helpers
│   │   ├── Header/                # Top bar: ranking + username + avatar/login avatar button
│   │   ├── Counter/                # Countdown number + login/CTA copy on Home
│   │   ├── Buttons/                # "Info" and "Play" buttons on Home
│   │   ├── GlobalScore/            # Top-5 leaderboard list
│   │   ├── GameOverModal/          # Game-over overlay (Restart / Menu)
│   │   ├── BottomInfo/             # Bottom-sheet content: logged-in profile card, or email login/sign-up form
│   │   ├── AuthEmail.tsx          # Email/password sign-in + sign-up form (uses @rneui)
│   │   └── Account.tsx            # ⚠ Unused Supabase profile-edit form (no screen imports it)
│   │
│   ├── screens/
│   │   ├── index.ts               # Barrel: re-exports Game and Home
│   │   ├── Home/                   # Landing screen: header, title, leaderboard, counter, play/info buttons, bottom sheet
│   │   └── Game/
│   │       ├── index.tsx           # ✅ The actual game: Animated-based falling-symbol matching game
│   │       ├── styled.tsx          # Game screen's styled-components
│   │       ├── entities/, components/{Bird,Floor,Obstacle}.js, utils/random.js
│   │       │                       # ⚠ Dead code: a Matter.js/Flappy-Bird prototype, not imported by index.tsx
│   │
│   ├── navigation/
│   │   ├── Menu.tsx               # De-facto router (local useState<Screens>, no nav library); owns the Supabase session and fans out the Home-screen data hooks
│   │   └── styled.tsx             # SafeContainer wrapper
│   │
│   ├── hooks/
│   │   ├── useAppState.ts         # Hydrates/persists the Redux store via AsyncStorage
│   │   ├── useFontAndLayout.ts    # Loads custom fonts, hides the splash screen once ready
│   │   ├── useProfile.ts          # Fetch a user's `profiles` row
│   │   ├── useUpdateProfile.ts    # Upsert a `profiles` row
│   │   ├── useTopUsers.ts         # Fetch top-5 `profiles` by `bestscore`
│   │   ├── useEndDate.ts          # Fetch the `endDate.end_date` countdown target
│   │   ├── useSafeMessage.ts      # Fetch the `endDate.safe_message` flag (toggles Home copy)
│   │   └── useService.ts          # Generic React Query wrappers (`useQueryService`/`useMutationService`) — defined but currently unused
│   │
│   ├── store/
│   │   ├── redux/
│   │   │   ├── index.ts           # combineReducers → { user }, configureStore, useAppDispatch
│   │   │   └── user/index.ts      # `user` slice: { name, email } only
│   │   └── async/
│   │       ├── loadState.ts / saveState.ts   # AsyncStorage ⇄ whole Redux state, used by useAppState
│   │       ├── constants.ts       # AsyncStorage key names (KEY_CONSTANTS)
│   │       └── readData.ts / storeData.ts    # ⚠ Generic AsyncStorage helpers — unused, and readData.ts imports a nonexistent `@types`/`IToday` (does not type-check)
│   │
│   ├── themes/index.ts            # `DefaultTheme` shape + `lightTheme`/`darkTheme` (currently identical values)
│   ├── translations/resources.ts  # i18next resource table (en/es) — not wired up (no `i18next.init`)
│   └── utils/
│       ├── constants.ts           # `Screens`, `REGISTER`, `REG_METHOD` enums; `fontSizes`; `IUser`/`ITopUser` types
│       ├── scaleFunctions.ts      # `scale`/`verticalScale`/`moderateScale` (350×680 guideline), platform flags
│       ├── utils.ts               # `isDefined` + re-exported lodash predicates
│       └── supabase.ts            # ⚠ NOT IN GIT (see below) — the actual Supabase client
│
├── sample.ts, constants.ts, types.ts   # ⚠ Unused, repo-root Reanimated "brick breaker" physics prototype (not imported by App.tsx/index.ts)
└── package.json / package-lock.json
```

### Required local file not in git

`src/utils/supabase.ts` is gitignored (`.gitignore` → `#supbase` section: `./src/utils/supabase.ts`, `**/supabase.ts`)
and is **not present in the repository**. Every Supabase-backed hook (`useProfile`,
`useSafeMessage`, `useEndDate`, `useTopUsers`, `useUpdateProfile`), `Menu.tsx`,
`Account.tsx`, `AuthEmail.tsx`, and the Game screen import `supabase` from it. Without
a local file exporting `supabase = createClient(url, anonKey)` from
`@supabase/supabase-js`, the app will not build. Create a minimal one before touching
auth/data code if it's missing.

## Getting started

```bash
npm install
npm start          # expo start — Metro bundler + dev menu (scan QR with Expo Go)
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web        # expo start --web
```

There is no test suite and no lint/format npm script. Useful ad-hoc commands:

```bash
npx tsc --noEmit                        # type-check
npx @biomejs/biome check .              # lint (per biome.json rules)
npx @biomejs/biome format --write .     # format (tabs, width 4, double quotes)
```

EAS build profiles (`eas.json`): `development` (dev client, internal), `preview`
(internal), `production` (auto-increment version) — run via `eas build --profile <name>`
(requires EAS CLI + login).

## Architecture

**Entry chain**: `index.ts` → `App.tsx` → `Menu.tsx`. `App.tsx` wraps the tree in the
Redux `Provider`, a `styled-components` `ThemeProvider` (always `darkTheme`), and
`GestureHandlerRootView`, and renders nothing until `useFontsAndLayout` reports fonts
loaded.

**`Menu.tsx` is the de-facto router.** There is no navigation library in use; screen
switching is local `useState<Screens>` toggling between `Home` and `Game`
(`Screens` enum in `src/utils/constants.ts`). `Menu.tsx` also owns the Supabase auth
session (`supabase.auth.getSession` / `onAuthStateChange`) and calls four independent
Supabase-backed hooks that Home's props are assembled from:
- `useProfile` — current user's `profiles` row
- `useSafeMessage` — a copy/kill-switch flag (`endDate.safe_message`)
- `useEndDate` — a countdown target rendered on Home (`endDate.end_date`)
- `useTopUsers` — top-5 leaderboard (`profiles` ordered by `bestscore`)

**Backend (Supabase).** Two tables are read/written directly from client hooks (no
API layer): `profiles` (`id`, `username`, `ranking`, `lastscore`, `bestscore`,
`avatar_url`) and `endDate` (`end_date`, `safe_message`). Auth is Supabase email/password
(`AuthEmail.tsx`); Google/Facebook/Apple sign-in buttons exist in `BottomInfo` but are
commented out or no-ops (`onHandleLoginWithGoogle = () => {}`).

## State management

There are two separate, largely disconnected state mechanisms:
- **Redux** (`src/store/redux`) holds only a `user` slice (`name`, `email`) — this is
  vestigial; actual profile/session data flows as props from the Supabase hooks
  above, not through Redux.
- **`useAppState`** (`src/hooks/useAppState.ts`) hydrates the Redux store from
  `AsyncStorage` on mount (`loadState`) and persists on every store change
  (`store.subscribe(() => saveState(...))`) via `src/store/async/{loadState,saveState}.ts`.
- Supabase is the real source of truth for auth/profile/leaderboard data; Redux/
  AsyncStorage do not currently mirror it.

## Styling system

- **Theme**: `src/themes/index.ts` declares the `DefaultTheme` shape via
  `styled-components` module augmentation (`themeName`, `bgColor`, `bgColorDark`,
  `txtColor`, `txtGrayColor`, `blackColor`, `redColor`, `blueColor`, `pinkColor`,
  `lightGray`) and exports `lightTheme`/`darkTheme` — both currently hold identical
  values. `App.tsx` always applies `darkTheme`; there is no theme toggle.
- **Per-component styling**: every component/screen directory pairs `index.tsx`
  (markup/logic) with a sibling `styled.tsx` (all `styled-components/native`
  declarations for that piece), e.g. `Header/index.tsx` + `Header/styled.tsx`.
  Styled components read the theme via `(props: DefaultTheme) => props.theme.xxx`.
- **Text primitives**: `src/components/Text.tsx` defines three base `styled.Text`
  components, one per bundled custom font — `TextObelix` ("obelix"), `TextKomi`
  ("komi"), `TextLucky` ("lucky") — loaded by `useFontsAndLayout` from
  `assets/fonts/{ObelixPro-cyr,komi,LuckiestGuy-Regular}.ttf`. Every other styled
  text component in the app (`ButtonsText`, `CounterNumber`, `TextInfo*`, etc.)
  extends one of these three via `styled(TextObelix)` / `styled(TextKomi)` /
  `styled(TextLucky)` rather than declaring `styled.Text` directly — keep following
  that pattern for new text.
- **Responsive sizing**: `src/utils/scaleFunctions.ts` exports `scale`/
  `verticalScale`/`moderateScale`, all computed against a 350×680 "guideline" device
  size, plus `windowWidth`/`windowHeight`/platform flags (`isWeb`/`isIOs`/
  `isAndroid`/`isMobile`). Styled-component templates call these functions inline for
  font sizes, padding, and dimensions instead of hardcoding raw numbers, e.g.
  `font-size: ${scale(fontSizes.Xlarge)}px;`. Base font sizes live in
  `fontSizes` (`src/utils/constants.ts`): `xsmall`…`XXXlarge`.
- **Layout containers**: `src/components/Container.tsx` provides two generic flex
  helpers (`ContainerColumn`, `ContainerRow`) reused across a few components (e.g.
  `BottomInfo`'s `UserNotContainer`).

## Fonts & splash

`useFontsAndLayout` (`src/hooks/useFontAndLayout.ts`) loads three named fonts via
`expo-font` — `komi`, `obelix`, `lucky` — and `App.tsx` renders `null` until that
resolves. `expo-splash-screen` is configured via the `app.json` plugin block
(`assets/splash_screen.png`, dark/light variants) and hidden through
`SplashScreen.hideAsync()` inside `useFontsAndLayout`'s `onLayoutRootView` callback.

## Path aliases

Kept in sync between `tsconfig.json` (`compilerOptions.paths`) and `.babelrc`
(`module-resolver`): `@src/*`, `@assets/*`, `@hooks/*`, `@store/*`, `@themes/*`,
`@screens/*`, `@components/*`, `@translations/*`. Some older files use bare
`src/...` / `store/redux` imports (no `@`) instead — both resolve at build time, but
prefer the aliased form (`@src/...`) in new code. Note `src/store/async/readData.ts`
imports from `@types`, which is **not** a configured alias — that file does not
resolve/type-check (see below).

<!-- ## Known dead/broken code

Don't extend the following assuming they're live — confirmed by grepping for
importers; nothing in the active app tree references them:

- **`src/screens/Game/entities/`, `src/screens/Game/components/{Bird,Floor,Obstacle}.js`,
  `src/screens/Game/utils/random.js`** — a Matter.js/`react-native-game-engine`
  Flappy-Bird prototype. The real `Game/index.tsx` is a from-scratch implementation
  using the plain RN `Animated` API and imports none of this.
- **Repo-root `sample.ts`, `constants.ts`, `types.ts`** — an unused
  `react-native-reanimated`-worklet brick-breaker physics prototype, not imported by
  `App.tsx`/`index.ts`.
- **`src/components/Account.tsx`** — a Supabase profile-edit form; no screen renders
  it (`BottomInfo`'s logged-in view is a read-only card, not this component).
- **`src/store/async/readData.ts` / `storeData.ts`** — generic AsyncStorage helpers
  exported from `store/async/index.ts` but never called anywhere; `readData.ts` also
  imports `IToday` from a nonexistent `@types` module/alias, so it doesn't
  type-check as-is.
- **i18next** — `i18next`, `react-i18next`, and `src/translations/resources.ts`
  are present, but `i18next.init(...)` is never called and no component uses
  `useTranslation`; all UI copy is hardcoded English/Spanglish strings.
- **`useService.ts`** (`useQueryService`/`useMutationService`) — generic React Query
  wrappers, not currently called by any hook or screen (all Supabase hooks use plain
  `useState`/`useEffect` instead).
-->
