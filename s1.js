
/* ==========================================================================
   1. SITE — edit these four lines before going live
   ========================================================================== */
const SITE = {
  domain:   "numerakey.com",
  email:    "hello@numerakey.com",
  store:    "https://numerakey.lemonsqueezy.com",  // your Lemon Squeezy store
  currency: "$"
};

/* ==========================================================================
   2. CATALOGUE — one object per app. Add, reprice, reorder, retire here.
      status: "live" | "soon"
      buy:    optional full Lemon Squeezy URL; otherwise store + /buy/<slug>
   ========================================================================== */
const CATEGORIES = [
  { id:"wellness", name:"Wellness",     colour:"#5CC8F5", note:"Quiet tools for hard seasons." },
  { id:"sound",    name:"Sound",        colour:"#4FD1C5", note:"Tones, beats and nature, mixed the way you want them." },
  { id:"narc",     name:"Narcissistic Abuse", colour:"#F2789A", note:"Recognising it, surviving it, and getting out." },
  { id:"divine",   name:"Divination",   colour:"#B478F0", note:"Numerology, tarot, and the older systems." },
  { id:"money",    name:"Money",        colour:"#F4B740", note:"Know where it goes." },
  { id:"home",     name:"Home & Pets",  colour:"#EC8FC4", note:"The household, and everyone in it." },
  { id:"style",    name:"Style",        colour:"#E8A0A8", note:"What suits you, worked out properly." }
];

const AP1 = [
{
  slug:"sanctuary", name:"Sanctuary", cat:"wellness", price:39, status:"live",
  cover:"covers/sanctuary.jpg",
  desc:"The big one \u2014 a companion to talk to, a locked journal, grounding tools and sleep sound.",
  tag:"Nothing is required of you here.",
  body:[
    "Sanctuary is five things in one place. Aria, a companion you can speak to out loud or write to. A journal you can lock. A toolkit for the moments that get away from you, including the five-four-three-two-one that puts you back in the room. Sleep sound on a twenty-minute, forty-five-minute or all-night timer. And a learn section for when you want to understand what is happening rather than just get through it.",
    "There are sections on self-esteem and on the children, because those are the two things people carry into every hard season and neither is well served elsewhere. Crisis numbers sit one tap away throughout."
  ],
  inside:["Aria \u2014 speak to her, or write","A journal you can lock","Grounding toolkit for the bad moments","Sleep sound on 20-minute, 45-minute or all-night timers","Audio tuned to stay clear if you're hard of hearing","Sections on self-esteem and on the children","Crisis help always one tap away"]
},
{
  slug:"bloom-from-within", name:"Bloom From Within", cat:"wellness", price:39, status:"live",
  cover:"covers/bloom-from-within.jpg",
  desc:"Trauma recovery you can see moving — practices, check-ins and a progress view.",
  tag:"Recovery, measured gently.",
  body:[
    "Bloom is built around four things: the nervous-system practices you're trying to keep, a daily check-in on mood and activation, a journal, and a progress view that tells you whether any of it is shifting.",
    "It covers childhood and adult trauma, and it holds you to what you said you'd do without ever making you feel behind. A book or an app is not a therapist — said once, here, and not again."
  ],
  inside:["Practices you set and keep","Daily check-in on mood and activation","Journal alongside the tracking","Progress across weeks, not days","Private and offline, no account"]
},
{
  slug:"coming-home", name:"Coming Home", cat:"wellness", price:59, status:"live", ready:true,
  cover:"covers/coming-home.jpg",
  desc:"Inner child work that builds a safe room first, then goes back for the parts still waiting there.",
  tag:"Stand with the child who still lives in you.",
  body:[
    "It starts by asking how much room you have today, and builds a safe room before anything else \u2014 because this work goes wrong when it opens the door before there is anywhere to stand. Then the groundwork: what the inner child actually is, why toxic shame behaves like weather rather than a thought, family roles, the four F protectors, and the fact that it is parts rather than one child.",
    "Shame gets a whole section of its own \u2014 the two kinds, how it differs from guilt, how it got inside and how it hides. There are letters to write, and notes that stay yours."
  ],
  inside:["A safe room built before anything is opened","Paced by how much room you have today","Toxic shame \u2014 the two kinds, and how it hides","Family roles and the four F protectors","Parts work, not one single child","Letters, and notes kept on your device","Plain about what it is not"]
},
{
  slug:"indomita", name:"Indomita", cat:"narc", price:39, status:"live",
  cover:"covers/indomita.jpg",
  desc:"Surviving one \u2014 through the separation, the smear, and everything designed to wear you down.",
  tag:"Built to outlast them.",
  body:[
    "Leaving is not the end of it. What follows is a long campaign of delay, provocation and rewriting, run by someone with more appetite for it than you have. Indomita is the structure for holding your ground through that.",
    "Log incidents while they are fresh and watch the pattern build into something legible. Keep communication short and unusable against you. Written for people who have been told, repeatedly, that they are imagining it."
  ],
  inside:["Timestamped incident log","The pattern, visible across months","Communication templates that give them nothing","A clean chronology you can export","Nothing leaves your device"]
},
{
  slug:"haven", name:"Haven", cat:"narc", price:39, status:"live",
  cover:"covers/haven.jpg",
  demo:"https://haven-6.netlify.app",
  desc:"Nervous system first \u2014 for the pull, the contact, and the days after.",
  tag:"Nothing is required of you here.",
  body:[
    "Haven opens with one question \u2014 how is your system right now \u2014 and four honest answers, including \"I don't know\". What it offers next depends on which one you pick, because what settles a shutdown is not what settles a spike. The tools are the physiological sigh, orienting, the butterfly hug, feet on the floor, voo and hum, and five-four-three-two-one.",
    "There is a button on the front page for the moment they make contact, and a Learn section that explains why the pull is real without treating it as a mistake you made: trauma bonds, hoovering, and why stabilisation comes before processing. The journal stays on the device. No streak, no target, no account."
  ],
  inside:["Four states, including \"I don't know\"","Tools matched to the state you're actually in","One tap for the moment they make contact","Trauma bonds and hoovering, explained plainly","Nervous system before processing","A journal that never leaves the device"]
},
{
  slug:"black-sheep", name:"The Black Sheep", cat:"narc", price:39, status:"live", ready:true,
  cover:"covers/black-sheep.jpg",
  desc:"For the one the family named difficult \u2014 and for the adult watching the same coat held out to a child.",
  tag:"You were never the problem.",
  body:[
    "Five rooms, walked at whatever pace you keep: the family and its myth, how you came to be cast, what the job looks like day to day, and the furniture the role leaves behind once you put it down. One room is about the next lamb \u2014 what happens when the container leaves and the system starts looking again. That room is the reason to hand this to a grandparent who can see it starting.",
    "The tools are careful with language. The recogniser names a pattern, never a person \u2014 no \"you are X\". The decoder takes an incident and tries to name the mechanism. There is a family map for who was given which job, shame-return cards for when the heat arrives, and a private page for what you don't want to lose."
  ],
  inside:["Five rooms, no homework, stay as long as it's true","The next lamb \u2014 when the system looks again","A recogniser that names patterns, never people","A decoder for what just happened","A family map of who holds which job","Shame-return cards, one sentence at a time","Quick exit button, and 000, Lifeline, Blue Knot, 1800RESPECT"]
},
{
  slug:"cassandra", name:"Cassandra", cat:"narc", price:39, status:"live",
  cover:"covers/cassandra.jpg",
  desc:"Naming narcissistic family patterns, so the thing you noticed has a shape.",
  tag:"You were not imagining it.",
  body:[
    "Cassandra walks through the recognisable moves — rewriting history, the golden child, the silent treatment — and helps you map them onto what actually happened in your family.",
    "Recognition first. What you do next is yours."
  ],
  inside:["Pattern library with plain examples","Map your own family roles","Reality-check log for gaslighting","Boundary scripts you can adapt","Private and offline"]
},
{
  slug:"harbor", name:"Harbor", cat:"wellness", price:39, status:"live", ready:true,
  cover:"covers/harbor.jpg",
  demo:"https://harbour.app",
  desc:"A companion for living with MS \u2014 fatigue, fog, heat, flares, and the days that ask too much.",
  tag:"Not a chart. Company.",
  body:[
    "Harbor talks about the parts of multiple sclerosis that take up the most room and get the least airtime: why MS fatigue is not ordinary tiredness, how people tell a relapse from a heat flare, what cog fog actually does to a working day, bladder urgency, the MS hug, and the grief of a life that changed shape. You can type or talk to it \u2014 it speaks with the voice already on your device, so nothing is sent anywhere.",
    "There is a soft daily check-in for energy, pain, mood and symptoms, which it remembers and refers to when you talk. It is careful about its limits: it will not recommend starting, stopping or switching a medicine, it points you to your neurology team for anything new or worsening, and it names emergencies as emergencies. Crisis support is Lifeline 13 11 14 first, because it was built here."
  ],
  inside:["Talk or type \u2014 it speaks with your device's own voice","Daily check-in it remembers and refers back to","Fatigue, heat, fog, mobility, bladder, vision, pain","Energy banking, and a 4\u00b72\u00b76 breath","Questions to take to your neurologist","Lifeline 13 11 14 and 988 when it matters","A companion, never a substitute for your care team"]
},
{
  slug:"spirit-breath", name:"Spirit Breath", cat:"wellness", price:89, status:"live", ready:true,
  cover:"covers/spirit-breath.jpg",
  demo:"https://spirit-breath.vercel.app",
  desc:"A full breathwork practice \u2014 guided techniques, a seven-part journey, and the reasoning behind each one.",
  tag:"Breathe yourself awake.",
  body:[
    "Short techniques for right now \u2014 low and slow, box, triangle, yawn and sigh, connected circular breathing \u2014 each with the reasoning behind it rather than just a count to follow. A seven-part journey builds the practice properly, starting with the full yogic breath.",
    "Educational practice inspired by Dan Brul\u00e9's Spiritual Breathing teachings, not affiliated with him and no substitute for his books or courses. Not a medical device: breathe gently, stop if you feel dizzy, and never hold your breath in water or while driving."
  ],
  inside:["Guided sessions from ninety seconds up","A technique library with the why, not just the count","Seven-part journey through the essentials","Progress kept on your device","Safety guidance throughout","One file, works offline"]
},
{
  slug:"rise", name:"Rise", cat:"narc", price:39, status:"live", ready:true,
  cover:"covers/rise.jpg",
  desc:"Name the move as it happens, settle your body, protect your record, and keep going.",
  tag:"A detour, not a destination.",
  body:[
    "Built on the idea that the chaos is not random. Gaslighting, splitting, projection, double standards \u2014 there is a playbook, and Rise lays it out as what to expect, how it feels when it lands, and what to do instead of arguing with it. Naming the move is what stops you re-litigating your own memory at two in the morning.",
    "Alongside that: grounding for when your body is already at full alert, a check-in that gives you clarity without hanging a label on anyone, exit ideas, digital safety and a go-bag list. Everything stays on the device behind an optional PIN, and the help directory is regional \u2014 1800RESPECT, Lifeline and MensLine first, with the US and UK lines underneath."
  ],
  inside:["The playbook \u2014 expect it, feel it, counter it","Grounding for when the body is already alert","A check-in that clarifies without diagnosing","Exit ideas, digital safety, go-bag checklist","Regional hotlines \u2014 1800RESPECT and Lifeline first","Optional PIN on the whole app","Nothing leaves your device"]
},
{
  slug:"narc-escape-guide", name:"Narc Escape Guide", cat:"narc", price:39, status:"live", ready:true,
  cover:"covers/narc-escape-guide.jpg",
  demo:"https://narc-escape-guide.netlify.app",
  desc:"Name the tactics, check your own reality, and plan a quieter way out.",
  tag:"Name the pattern. Find the door.",
  body:[
    "For anyone living with someone who keeps rewriting them. The cycle has a vocabulary \u2014 love bombing, gaslighting, DARVO, hoovering \u2014 and having the words for it is where the fog starts to take a shape.",
    "It treats leaving as a safety problem before it is a conversation: gather quietly, don't announce the plan. Then the part nobody prepares you for, which is what happens after the latch clicks. Not therapy, not a courtroom. Crisis lines are one tap away inside. Nothing you type is saved \u2014 not on a server, not even on the phone \u2014 so there is nothing for anyone to find later."
  ],
  inside:["A plain vocabulary for the tactics","A private reality check, not a diagnosis","Leaving planned as a safety problem","What no contact actually looks like","Nothing is saved, anywhere","Crisis lines one tap away"]
},
{
  slug:"auraflow", name:"AuraFlow Plus", cat:"sound", price:39, status:"live",
  cover:"covers/auraflow.jpg",
  desc:"Four moods and six layers of nature sound, mixed to whatever the evening needs.",
  tag:"Living nature. Yours to mix.",
  body:[
    "Relax, sleep, meditate or soothe \u2014 each one a different bed of sound, and each layer on its own fader. Birdsong sparse and distant, a stream, light rain, ocean a long way off, and an alpha binaural layer if you have headphones on.",
    "Set a timer from five to twenty minutes, or leave it running. Add your own music over the top. Nothing is streamed and nothing is uploaded; the layers live on your device."
  ],
  inside:["Four modes: relax, sleep, meditate, soothe","Six layers, each with its own volume","Alpha binaural layer for headphones","Timers from five to twenty minutes","Mix your own music over the top","Plays offline, nothing uploaded"]
},
{
  slug:"vesper", name:"Vesper", cat:"sound", price:29, status:"live", ready:true,
  cover:"covers/vesper.jpg",
  desc:"Binaural beats and Tibetan bronze bowls \u2014 two modes, and they never run together.",
  tag:"One mode at a time.",
  body:[
    "Most sound apps let you stack everything until it turns to mush. Vesper refuses: the binaural field and the bowls are exclusive, and starting one fully stops the other. Each ear gets a harmonic stack rather than a thin sine, so the field has some body to it.",
    "Delta near sleep, theta inward, alpha for open attention, beta for desk work, gamma as a short bright field \u2014 with the guide explaining what each one is for and why headphones are not optional. The bowls ring on their own timing rather than a loop, so it never settles into a pattern you can predict."
  ],
  inside:["Binaural beats, five bands, headphones required","Tibetan bronze bowls, struck on their own timing","The two modes never mix","Gesture control and journeys","Timer and volume, set low by default","A guide that explains the method","20 KB \u2014 the whole app is one file"]
},
{
  slug:"binaural-studio", name:"Binaural Studio", cat:"sound", price:39, status:"live",
  cover:"covers/binaural-studio.jpg",
  desc:"Five binaural presets layered with music and nature. Headphones required.",
  tag:"Headphones on.",
  body:[
    "Five presets from two hertz up to fifteen \u2014 deep sleep, calm, relax, de-stress, focus \u2014 each layered with ocean, rain or rainstorm, and your own music if you want it. Master, binaural, music and nature all have separate faders.",
    "Headphones are not optional here: the beat only exists because the two ears get different tones. Timers at fifteen, thirty and sixty minutes, or leave it running."
  ],
  inside:["Five presets from 2 Hz to 15 Hz","Separate faders for beats, music and nature","Ocean, rain and rainstorm beds","Timers at 15, 30 and 60 minutes","Hearing boost you control","Runs offline"]
}
];
