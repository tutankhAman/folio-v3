// ─── Persistent ASCII Buddy Stage Data ────────────────────────────────────────
// Defines where the buddy teleports to and what it says at each scroll stage.
// Positions are chosen to AVOID overlapping images, visuals, and center text.

export interface BuddyStageConfig {
  /** CSS position classes (absolute positioning within the sticky viewport) */
  position: string;
  /** Pool of random comments the buddy might say at this stage */
  comments: string[];
  /** Which expression index to prefer (maps to EXPRESSIONS in ascii-buddy) */
  expressionHint?: number;
}

// Expression indices for reference:
// 0: chillin, 1: happy, 2: uwu, 3: surprised, 4: sleepy,
// 5: excited, 6: meh, 7: wink, 8: dead, 9: love, 10: rich, 11: confused

export const buddyStageConfig: Record<number, BuddyStageConfig> = {
  // Stage 0: "Hey I'm AMAN" — buddy introduces itself, top-right area
  0: {
    position: "right-[6%] top-[12%]",
    comments: [
      "oh hey, you're here!",
      "welcome welcome~",
      "scroll down, i dare you",
      "that's my human btw →",
    ],
    expressionHint: 5, // excited
  },

  // Stage 1: "I'm a designer" — golden spiral takes inset-0, buddy goes bottom-left
  1: {
    position: "left-[6%] bottom-[12%]",
    comments: [
      "he really said designer",
      "pixels are his love language",
      "golden ratio enjoyer",
      "aesthetics > everything",
    ],
    expressionHint: 9, // love
  },

  // Stage 2: "I'm a developer" — code-grid inset-0 + CLI bottom-right area, buddy top-left
  2: {
    position: "left-[6%] top-[12%]",
    comments: [
      "now we're talking",
      "01100011 01101111 01100100 01100101",
      "console.log('hello')",
      "bugs? never heard of em",
    ],
    expressionHint: 7, // wink
  },

  // Stage 3: "I'm a cs undergrad" — binary rain inset-0, buddy bottom-right
  3: {
    position: "right-[6%] bottom-[12%]",
    comments: [
      "still in school btw",
      "homework? what homework",
      "cs stands for 'cool stuff'",
      "the matrix has him",
    ],
    expressionHint: 11, // confused
  },

  // Stage 4: "Co-founder of Singularity Works" — converging lines + pulse bottom-left, buddy top-right
  4: {
    position: "right-[6%] top-[12%]",
    comments: [
      "co-founder energy !!!",
      "built different fr",
      "startup grindset activated",
      "singularity is near",
    ],
    expressionHint: 10, // rich
  },

  // Stage 5: "obsessed with look, feel, work" — images scattered, buddy bottom-center-right
  5: {
    position: "right-[6%] bottom-[8%]",
    comments: [
      "obsessed is an understatement",
      "look at those photos tho",
      "vibes: immaculate",
      "he's not lying",
    ],
    expressionHint: 3, // surprised
  },

  // Stage 6: "It began with curiosity" — images left + right, buddy top-center
  6: {
    position: "left-[50%] top-[6%] -translate-x-1/2",
    comments: [
      "curiosity didn't kill this cat",
      "origin story incoming",
      "the lore deepens",
      "keep scrolling...",
    ],
    expressionHint: 0, // chillin
  },

  // Stage 7: "curiosity about interfaces" — images left + right, buddy bottom-center
  7: {
    position: "left-[50%] bottom-[6%] -translate-x-1/2",
    comments: [
      "interfaces are his thing",
      "UI/UX brain activated",
      "buttons go brrrr",
      "every pixel matters",
    ],
    expressionHint: 1, // happy
  },

  // Stage 8: "how software actually works" — wireframe right + code-grid left, buddy bottom-center
  8: {
    position: "left-[50%] bottom-[8%] -translate-x-1/2",
    comments: [
      "the 'how' matters",
      "under the hood stuff",
      "software archaeology",
      "abstractions all the way down",
    ],
    expressionHint: 11, // confused
  },

  // Stage 9: "Design came first" — 3 large images scattered, buddy far bottom-right
  9: {
    position: "right-[4%] bottom-[6%]",
    comments: [
      "design-first mentality",
      "form follows function",
      "or does function follow form?",
      "pretty things first",
    ],
    expressionHint: 9, // love
  },

  // Stage 10: "Learning how experiences should feel" — flowing wave inset-0, buddy top-right
  10: {
    position: "right-[6%] top-[12%]",
    comments: [
      "~wavy~",
      "feeling the flow",
      "experience is everything",
      "smooth like butter",
    ],
    expressionHint: 2, // uwu
  },

  // Stage 11: "interactions should flow" — images left + right, buddy top-center
  11: {
    position: "left-[50%] top-[5%] -translate-x-1/2",
    comments: [
      "flow state: activated",
      "interaction design nerd",
      "click, tap, swipe, scroll",
      "make it feel natural",
    ],
    expressionHint: 1, // happy
  },

  // Stage 12: "Development followed" — images left + right, buddy bottom-center
  12: {
    position: "left-[50%] bottom-[6%] -translate-x-1/2",
    comments: [
      "then came the code",
      "design → development pipeline",
      "bringing ideas to life",
      "shipping time",
    ],
    expressionHint: 5, // excited
  },

  // Stage 13: "balance became the goal" — orbit dots left + right, buddy top-center
  13: {
    position: "left-[50%] top-[8%] -translate-x-1/2",
    comments: [
      "perfectly balanced",
      "as all things should be",
      "yin and yang energy",
      "equilibrium achieved",
    ],
    expressionHint: 0, // chillin
  },

  // Stage 14: "intelligent assistants" — larity images left + right, buddy bottom-center
  14: {
    position: "left-[50%] bottom-[8%] -translate-x-1/2",
    comments: [
      "AI assistants!! like me??",
      "i'm basically his creation",
      "artificial but intelligent",
      "beep boop i'm helping",
    ],
    expressionHint: 5, // excited
  },

  // Stage 15: "seamless web platforms" — 3 images scattered, buddy top-center
  15: {
    position: "left-[50%] top-[4%] -translate-x-1/2",
    comments: [
      "web platforms galore",
      "full-stack energy",
      "the internet is his canvas",
      "ship it ship it ship it",
    ],
    expressionHint: 10, // rich
  },

  // Stage 16: "AI inside everyday software" — verq image right + nodes left, buddy bottom-center-left
  16: {
    position: "left-[50%] bottom-[6%] -translate-x-1/2",
    comments: [
      "AI everywhere",
      "the future is now",
      "everyday AI is the move",
      "software + AI = magic",
    ],
    expressionHint: 3, // surprised
  },

  // Stage 17: "CS student" — 3 images scattered, buddy far right center
  17: {
    position: "right-[3%] top-[50%] -translate-y-1/2",
    comments: [
      "still studying btw",
      "learning never stops",
      "cs student by day, builder by night",
      "homework can wait",
    ],
    expressionHint: 4, // sleepy
  },

  // Stage 18: "simplifying complex problems" — nodes right + scatter left, buddy bottom-center
  18: {
    position: "left-[50%] bottom-[6%] -translate-x-1/2",
    comments: [
      "complexity → simplicity",
      "make hard things easy",
      "that's the whole job",
      "elegant solutions only",
    ],
    expressionHint: 7, // wink
  },

  // Stage 19: "collection of experiments" — scatter inset + pulse left, buddy right
  19: {
    position: "right-[6%] top-[12%]",
    comments: [
      "experiments everywhere",
      "try everything once",
      "some worked, some didn't",
      "that's the point tho",
    ],
    expressionHint: 1, // happy
  },

  // Stage 20: "collection of projects" — converging + crosshair right, buddy bottom-left
  20: {
    position: "left-[6%] bottom-[12%]",
    comments: [
      "projects on projects",
      "shipped and delivered",
      "target acquired",
      "from idea to reality",
    ],
    expressionHint: 5, // excited
  },

  // Stage 21: "collection of failures" — glitch lines inset, buddy bottom-right
  21: {
    position: "right-[6%] bottom-[12%]",
    comments: [
      "it's okay to fail",
      "glitch in the matrix",
      "failure is just feedback",
      "we don't talk about these",
    ],
    expressionHint: 8, // dead
  },

  // Stage 22: "collection of refinements" — converging + spiral right, buddy left
  22: {
    position: "left-[6%] top-[12%]",
    comments: [
      "refine refine refine",
      "iteration is key",
      "getting better every day",
      "polish until it shines",
    ],
    expressionHint: 0, // chillin
  },

  // Stage 23: "Shipped ideas" — crosshair inset, buddy bottom-left
  23: {
    position: "left-[6%] bottom-[12%]",
    comments: [
      "SHIPPED.",
      "ideas → reality",
      "done is better than perfect",
      "ctrl+S, ctrl+ship",
    ],
    expressionHint: 5, // excited
  },

  // Stage 24: "thank you for being here" — clean stage, buddy center-right
  24: {
    position: "right-[8%] top-[50%] -translate-y-1/2",
    comments: [
      "thanks for scrolling this far!",
      "you're a real one",
      "i appreciate you",
      "hope you enjoyed the ride",
    ],
    expressionHint: 9, // love
  },

  // Stage 25: "collaborations welcome" — nodes left + pulse right, buddy top-center
  25: {
    position: "left-[50%] top-[8%] -translate-x-1/2",
    comments: [
      "let's build something!",
      "DMs are open~",
      "collaboration unlocked",
      "until next time ♥",
    ],
    expressionHint: 2, // uwu
  },
};
