# WA_Client
<b>Read messages without marking them as read!</b>
<h2>What exactly does this program do?</h2>
<p>When you run the script, a special Whatsapp client starts working that reads info about all incoming messages, logs that info in mySQL database and outputs it in the console!</p>
<h2>How to use the WA_Client?</h2>

 1. Clone the repository in any folder;
 2. Run `npm i` in the console in this folder;
 3. Launch `npm manage` to set up client;
 4. Run `electron .` to run the client;
 5. Scan the QR-code which appears if you toggle developer tools (Ctrl+Shift+I) in the console tab to log in (required only when launching the client for the first time for a long time) with your mobile WhatsApp app

<h2>Are there any hidden features?</h2>
<p>Yes, on the loading screen you can click on the right side to speed up the animation and on the left side to slow down the animation. You can also press Space key to give the ball a little boost.</p>
<h1>TODO List</h1>

 - [x] Make a more automatic setting up process
 - [x] Translate the client in English
 - [x] Make a GUI
 - [ ] Add PostgreSQL DB support
