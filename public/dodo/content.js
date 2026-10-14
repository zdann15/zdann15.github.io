/* ==================================================================
   ✎  EDIT ME. Everything that appears in the card lives in this file.

   • Any field left as "" shows a soft dashed placeholder, so you can
     see where it goes. Fill it in and the placeholder disappears.
   • Images: put files in the /images folder and reference them like
     "images/first-date.jpg". Square-ish photos look best in polaroids.
   • Line breaks: use \n inside a string.
   ================================================================== */

window.CARD = {
  // Set to true while editing to see dashed ✎ markers wherever a text field is still empty.
  showPlaceholders: false,

  // Shown in the browser tab.
  tabTitle: "",

  // When you got together. Drives the live "together for…" counter at the end.
  // Format: "YYYY-MM-DD" (or "YYYY-MM-DDTHH:MM" if you know the moment).
  startDate: "2023-10-14",

  // Optional song, e.g. "music/our-song.mp3". It fades in when she breaks the seal.
  music: "",

  // ── 1. The envelope ────────────────────────────────────────────
  envelope: {
    kicker: "",   // small spaced-out line above her name
    to: "Dodo"    // her name / nickname, written in script
  },

  // ── 2. The card's front cover ──────────────────────────────────
  cover: {
    eyebrow: "Three years of",   // small spaced-out line above the title
    title: "Dodo & ZCP",          // "&" gets a fancy italic ampersand; ALL-CAPS words get monogram capitals
    subtitle: "",
    image: "images/us.jpg"   // optional: leave "" to show the gold heart emblem instead
  },

  // ── 3. Pages inside the card, in order ─────────────────────────
  // Add, remove, reorder or duplicate freely. Available types:
  //   letter    { greeting, body: ["paragraph", "paragraph"], signoff, signature }
  //   photo     { image, caption, focus }   (focus: optional crop centre, e.g. "50% 20%")
  //   memory    { date, title, image, text }   (delete `image` for a text-only memory)
  //   polaroids { heading, photos: [{ image, caption }, …up to 3] }
  //   reasons   { heading, reasons: ["…", …up to 6] }   (tap-to-flip cards)
  //   quote     { text, by }
  //   note      { greeting, lines: ["…"], closing }   (Chinese brush-script note)
  //   end       { text, button }   (button leads to the finale)
  pages: [
    {
      type: "letter",
      greeting: "Dear Dodo,",
      body: [
        "Happy 3 years with your cutest ZCP! Thank you for being with me all this time and for making my life better in a bajillion different ways.",
        "There's so many awesome things about you — you cook such delicious food, you're so cute and pretty, you're so smart — I could go on and on forever."
      ],
      continues: true   // the letter carries on onto the next page
    },
    {
      type: "letter",
      continued: true,  // second half of the letter: no greeting
      body: [
        "I'm so glad that I get to spend so much time with you, exploring the world and trying all kinds of new things together. I feel so happy when I'm with you and I'm so excited for all of our future adventures together.",
        "I just want to protect you and love you forever and ever, and make sure that you feel loved. We have grown so much and I just feel so lucky that we have learned to love each other more and more and share so much of our lives with each other."
      ],
      signoff: "",
      signature: "ZCP"
    },

    { type: "photo", image: "images/IMG_6715.jpg", caption: "" },

    { type: "memory", date: "", title: "We're just two dummies who are in love ❤️", image: "images/IMG_5853.jpg", text: "" },

    {
      type: "polaroids",
      heading: "Dodo and ZCP are so cute together!",
      photos: [
        { image: "images/IMG_5268.jpg", caption: "", focus: "65% 50%" },
        { image: "images/IMG_6662.jpg", caption: "", focus: "65% 50%" },
        { image: "images/IMG_5144.jpg", caption: "", focus: "50% 62%" }
      ]
    },

    {
      type: "polaroids",
      heading: "I love you baby Dodo ❤️",
      photos: [
        { image: "images/IMG_7195.jpg", caption: "", focus: "35% 50%" },
        { image: "images/IMG_7142.jpg", caption: "", focus: "50% 30%" },
        { image: "images/IMG_7152.jpg", caption: "", focus: "50% 45%" }
      ]
    },

    {
      type: "polaroids",
      heading: "My Dodo is the cutest!!",
      photos: [
        { image: "images/IMG_6057.jpg", caption: "", focus: "50% 40%" },
        { image: "images/IMG_7126.jpg", caption: "", focus: "50% 40%" },
        { image: "images/IMG_7094.jpg", caption: "", focus: "50% 40%" }
      ]
    },

    { type: "photo", image: "images/museum.jpg", caption: "", focus: "50% 55%" },

    { type: "memory", date: "", title: "My beautiful Dodo", image: "images/IMG_5355.jpg", text: "", focus: "50% 12%" },

    {
      type: "note",     // a handwritten-style note in Chinese brush script; each line sits on its own row
      greeting: "宝宝",
      lines: [
        "我真的好爱好爱你",
        "你在我心里就是特别特别可爱",
        "那种我一想到你就会觉得心里暖暖的",
        "我觉得你对我特别好",
        "我觉得和你在一起很幸福"
      ],
      closing: "我会永远爱你的宝宝"
    },

    { type: "end", text: "", button: "" }
  ],

  // ── 4. The finale under the stars ──────────────────────────────
  finale: {
    kicker: "",
    title: "",
    message: ""
  },

  // ── Small interface labels (already filled in; change if you like) ──
  ui: {
    tapSeal: "tap the seal to open",
    openCover: "open me",
    turnHint: "tap or swipe to turn the page",
    tapHeart: "tap a heart",
    oneMore: "one more thing ♥",
    madeWithLove: "made with love",
    counterLabel: "together for",
    kiss: "send a kiss",
    replay: "read it again",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds"
  }
};
