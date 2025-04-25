# SignScan
This is the chrome extension used to summarize TOS pages to analyze potential user risks.


In order to test the Chrome extension:
1. Go to:
chrome://extensions/
(Type this directly into the Chrome address bar.)

2. Turn on "Developer mode"
(At the top-right of the page, there’s a little toggle button.)

3. Click "Load unpacked"
Big button near the top left.

4. Select your extension folder
Pick the folder where your manifest.json is.

5. It will load immediately
If your manifest.json is correct, your extension will appear on the list.

6. Pin your extension (optional)
Click the puzzle piece icon → Pin your extension so it shows on the toolbar.


To get the OpenAI working properly:
1. Within the popup.js file, replace the line "enter your api key here" with the shared API key from the OpenAI project.
