# SchoolAdminPage

## Notes on development as of end of day 5/27

The entire Firebase backend is set up and works properly, including both database and user authentication. In retrospect, tackling the Firebase backend first was probably not a good idea from an efficiency standpoint because I ran out of time to work on any user interaction in the app itself, but I chose to work on that first because I thought it would be more interesting; I assumed that the editing features would overlap quite significantly with the notes app, so I wanted to work on something new.

Hardcoded data is present in the code, but it's unnecessary to use to make data display on the page, as the app can access Firebase directly. It's mainly there to allow for hard resetting the Firebase data in case something goes wrong.
