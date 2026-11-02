# Wild West Hardscapes LLC — Website

Website for **Wild West Hardscapes LLC**, a hardscaping and outdoor living contractor in Reno / Northern Nevada (NV Lic. #0096054). Built by Nexora Digital.

Static site: plain HTML, CSS and JS with no build step. It deploys to Vercel as-is.

## Sections
- Hero with a reel in a phone frame and the fire pit patio photo
- Scrolling services ticker and three promises (Quality / Reliable / Built to Last)
- **Services**: 10 services you can click through. Each one's "Get an estimate" button ticks that service in the form, and 8 of them have a "Watch the video" button that plays a matching project video.
- **Winter Specials**: the $13k+ Free Upgrade and the Free Fire Pit Giveaway as two posters, plus the flyer, which opens larger when clicked. The "Reserve" buttons fill in the form for you.
- **Recent Work**: a gallery of 19 photos with a lightbox. It can be filtered by patios, fire pits, driveways, walls, turf and walkways.
- **Reels**: two vertical reels that play when scrolled into view and turn sound on when tapped, plus Instagram, TikTok and Facebook links
- **Project Video Library**: 12 project videos with a description, length and tags on each. They can be filtered by Patios, Driveways, Walls, Turf, Lighting and In Progress, preview on hover, and open in a player with sound.
- Process steps, service area, license card and FAQ
- **Contact / Free Estimate form**: service chips, budget, timeline, Winter Special checkbox and preferred contact method
- Call / Text / Estimate bar fixed to the bottom of the screen on mobile

## Connecting the contact form (client email)
Open `script.js` and edit `CONFIG` at the top:

```js
const CONFIG = {
  FORM_ENDPOINT: "",   // e.g. "https://formspree.io/f/abcd1234" or "https://api.web3forms.com/submit"
  WEB3FORMS_KEY: "",   // only needed for Web3Forms
  ...
};
```

- **Formspree**: create a form that sends to the client's email, then paste its URL into `FORM_ENDPOINT`.
- **Web3Forms**: set `FORM_ENDPOINT` to `https://api.web3forms.com/submit` and paste the access key.
- **Custom**: point it at any endpoint that accepts a JSON POST, such as a Vercel function at `/api/contact`.

While `FORM_ENDPOINT` is empty, the form still works. Submitting opens a text message to 775-229-2991 with all the project details already filled in.

## Deploy
Import the repo in Vercel. Use framework preset **Other** and leave the build command empty.
