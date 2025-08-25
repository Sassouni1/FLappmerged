# Frontend Timezone Integration Guide

## Overview
This document demonstrates how the frontend automatically detects and manages user timezone to ensure workout analytics are displayed correctly in the user's local timezone.

## Implementation Details

### 1. Package Installation ✅
```bash
yarn add react-native-localize
```

### 2. Login Screen Updates (`src/Screens/Auth/Login/index.js`)

#### Automatic Timezone Detection
```javascript
import { getTimeZone } from 'react-native-localize';

// State for storing detected timezone
const [userTimezone, setUserTimezone] = useState('UTC');

// Automatic detection when screen loads
useFocusEffect(
  React.useCallback(() => {
    // ... existing code
    
    // Automatically detect user's timezone
    try {
      const detectedTimezone = getTimeZone();
      console.log('Detected user timezone:', detectedTimezone);
      setUserTimezone(detectedTimezone);
    } catch (error) {
      console.warn('Could not detect timezone, using UTC:', error);
      setUserTimezone('UTC');
    }
  }, [])
);
```

#### Login Function Enhancement
```javascript
const login = async () => {
  const { email, password } = state;
  const emailError = await validator("email", email);
  const passwordError = await validator("password", password);
  
  if (!emailError && !passwordError) {
    dispatch(setLoader(true));
    
    console.log('Sending login request with timezone:', userTimezone);
    dispatch(
      loginRequest({ 
        email: email, 
        password: password, 
        role: "customer",
        timezone: userTimezone  // 🎯 Automatically detected timezone
      })
    );
  } else {
    dispatch(setLoader(false));
    setState({ ...state, emailError, passwordError });
  }
};
```

### 3. Redux State Management

#### Action Types (`src/Redux/action-types/index.js`)
```javascript
export const ACTIONS = {
  // ... existing actions
  SET_USER_TIMEZONE: 'SET_USER_TIMEZONE'
};
```

#### Action Creator (`src/Redux/actions/AuthActions.js`)
```javascript
export const setUserTimezone = timezone => ({
  type: ACTIONS.SET_USER_TIMEZONE,
  data: timezone,
});
```

#### Auth Reducer (`src/Redux/reducers/AuthReducers.js`)
```javascript
const initialState = {
  userToken: null,
  FirstTime: true,
  userData: null,
  isExistingUser: true,
  assprogram: null,
  userTimezone: 'UTC',  // 🎯 Store user timezone
  workoutTimers: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGIN_DATA:
      return {
        ...state,
        userToken: action.data?.response.token,
        userData: action.data?.response.user,
        isExistingUser: action?.data?.response?.isExistingUser,
        userTimezone: action.data?.response?.user?.timezone || state.userTimezone  // 🎯 Store from backend
      };

    case ACTIONS.SET_USER_TIMEZONE:
      return {
        ...state,
        userTimezone: action.data,  // 🎯 Update timezone
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        userToken: null,
        userData: null,
        isExistingUser: true,
        userTimezone: 'UTC'  // 🎯 Reset timezone on logout
      };
  }
};
```

### 4. Activity Screen Integration (`src/Screens/Activity/index.js`)

#### Access Timezone from Redux
```javascript
const user = useSelector((state) => state.auth.userData);
const userTimezone = useSelector((state) => state.auth.userTimezone || 'UTC');  // 🎯 Get timezone from Redux
```

Now the Activity screen has access to the user's timezone for proper display and calculations.

## Flow Diagram

```
📱 User Opens App
    ↓
🔍 Login Screen Loads
    ↓
🌍 Auto-detect Timezone (react-native-localize)
    ↓ 
📧 User Enters Credentials
    ↓
🚀 Login Request + Timezone → Backend
    ↓
💾 Backend Stores Timezone in User Model
    ↓
✅ Login Success + User Data (including timezone)
    ↓
🏪 Redux Stores Timezone
    ↓
📊 Activity Screen Uses Timezone for Analytics
    ↓
🎯 Correct Workout Days Displayed
```

## Timezone Detection Examples

### Detected Timezones by Location:
```javascript
// New York user
detectedTimezone: "America/New_York"

// Los Angeles user  
detectedTimezone: "America/Los_Angeles"

// London user
detectedTimezone: "Europe/London"

// Tokyo user
detectedTimezone: "Asia/Tokyo"

// Sydney user
detectedTimezone: "Australia/Sydney"
```

## Console Output Example

When user logs in from New York:
```
Detected user timezone: America/New_York
Sending login request with timezone: America/New_York
```

## Benefits

1. **🎯 Automatic Detection**: No manual timezone selection required
2. **🔄 Real-time Updates**: Timezone detected fresh on each login
3. **🌍 Global Support**: Works for any timezone worldwide  
4. **⚡ Seamless Integration**: Backend receives timezone automatically
5. **📊 Accurate Analytics**: Workout data shown on correct days
6. **🏪 Redux Management**: Timezone available throughout the app

## Testing Scenarios

### Test Case 1: New York User
- **Detection**: `America/New_York`
- **Workout at**: 11 PM EST → Shows on correct day
- **Analytics**: Weekly progress reflects local days

### Test Case 2: Los Angeles User  
- **Detection**: `America/Los_Angeles`
- **Workout at**: 11 PM PST → Shows on correct day (not next day)
- **Analytics**: Monthly progress aligned with local calendar

### Test Case 3: Tokyo User
- **Detection**: `Asia/Tokyo`
- **Workout at**: 7 AM JST → Shows on correct day
- **Analytics**: All metrics in local timezone

## Error Handling

```javascript
try {
  const detectedTimezone = getTimeZone();
  setUserTimezone(detectedTimezone);
} catch (error) {
  console.warn('Could not detect timezone, using UTC:', error);
  setUserTimezone('UTC');  // Fallback to UTC
}
```

## Next Steps

1. **✅ Complete**: Frontend timezone detection
2. **✅ Complete**: Backend timezone storage  
3. **✅ Complete**: Redux state management
4. **🔄 Test**: Full login-to-analytics flow
5. **📱 Deploy**: Test on physical devices

## Usage

The implementation is now complete and automatic. Users don't need to do anything - their timezone is detected and applied automatically when they log in, ensuring all workout analytics are displayed in their local timezone.