# 💕 Love Proposal Website 💕

A beautiful, interactive, and romantic date proposal website that will make asking someone out unforgettable! 

## Features ✨

- **Romantic Design**: White and red color scheme with beautiful gradients
- **Interactive Elements**: The "NO" button keeps running away when you try to click it
- **Falling Hearts & Emojis**: Celebration animations when "YES" is clicked
- **Personalized Messages**: Shows the couple's names and random cute messages
- **Backend Integration**: Node.js/Express server to save all proposals
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Separated Architecture**: Clean separation of HTML, CSS, and JavaScript

## Project Structure 📁

```
.
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Frontend JavaScript
├── server.js           # Express backend server
├── package.json        # Node.js dependencies
├── proposals.json      # Stored proposals (auto-created)
└── README.md          # This file
```

## Installation 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. **Navigate to project directory:**
   ```bash
   cd c:\Users\anesb\Documents\request
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Go to `http://localhost:3000`
   - Enter both names
   - Click YES! 💕
   - Watch the magic happen! ✨

## API Endpoints 🔗

### Get All Proposals
```
GET /api/proposals
```
Returns all saved proposals with statistics

### Get Proposal Statistics
```
GET /api/stats
```
Returns total count and recent proposals

### Create New Proposal
```
POST /api/proposal
Content-Type: application/json

{
  "person1": "Name 1",
  "person2": "Name 2",
  "timestamp": "2024-04-27T10:30:00Z"
}
```

### Get Single Proposal
```
GET /api/proposal/:id
```
Returns a specific proposal by ID

### Health Check
```
GET /api/health
```
Verify server is running

## How It Works 💖

1. **Frontend (HTML/CSS/JS)**:
   - Beautiful UI built with HTML5
   - Romantic styling with CSS3 animations
   - Interactive buttons and form validation with vanilla JavaScript

2. **Backend (Node.js/Express)**:
   - Receives proposal submissions
   - Stores them in `proposals.json`
   - Provides API endpoints for statistics
   - Logs each proposal with hearts 💕

3. **Animations**:
   - Falling emoji rain
   - Floating hearts background
   - Smooth transitions and scaling effects
   - Heartbeat animation on icons

## The "NO" Button 😄

The magic happens when someone keeps clicking "NO":
1. First click: "You sure? 😊"
2. Second click: "Come on... 🥺"
3. Third click: "Pretty please? 💕"
4. Fourth click: "You're breaking my heart! 💔"
5. Fifth click: "Last chance! 😭"
6. Sixth+ click: Button becomes "YES!!!" and activates automatically

The button also moves away when you hover over it, making it impossible to say no! 😉

## Technologies Used 🛠️

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON file
- **Animations**: CSS3 Keyframes, JavaScript DOM manipulation

## Customization 🎨

### Change Colors
Edit `styles.css` and replace:
- `#e91e63` (Main pink) with your color
- `#ff1744` (Red) with your color

### Edit Messages
In `script.js`, modify the `cuteMessages` array with your own romantic messages

### Add More Emojis
Update the `emojis` array in the `createEmojiRain()` function

## Browser Compatibility 🌐

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile Browsers: ✅ Responsive design

## Tips for Best Experience 💡

1. Use on a desktop for the full effect
2. Fullscreen the browser for maximum impact
3. Adjust your system volume if using on a shared device
4. Have the person sit next to you or share your screen
5. The falling hearts and emoji rain are the best part - don't skip that!

## Files Saved 📊

All proposals are automatically saved in `proposals.json`:
```json
{
  "id": 1,
  "person1": "Name 1",
  "person2": "Name 2",
  "timestamp": "2024-04-27T10:30:00Z",
  "status": "accepted",
  "createdAt": "2024-04-27T10:30:00Z"
}
```

## Made with Love 💕

This project was created with passion and care to help make proposals special and memorable!

---

**Enjoy! May your love story be as beautiful as this website! 🌹✨💖**
