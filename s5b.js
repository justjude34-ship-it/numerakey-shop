/* Additions that load after the catalogue is assembled (s5) and before the views (s6). */

/* the key-bitting bars on the home page follow the teal, purple, magenta sweep */
STOPS.splice(0, STOPS.length, "#2EC4B6", "#9B5DE5", "#E040B0");

APPS.push({
  slug:"lantern", name:"Lantern", cat:"narc", price:39, status:"live", ready:true,
  desc:"A calm space to understand relationship patterns, steady yourself, and plan healthy next steps.",
  tag:"Clarity without harsh labels.",
  body:[
    "Lantern is a place to look at what is happening in a relationship without being handed a verdict. Eighteen questions on red flags and how you feel around this person, answered privately, each with a short reflection that names the pattern rather than the person. You are not too sensitive for noticing what hurts.",
    "When you are shaken there is somewhere to steady yourself first: breathing, 5-4-3-2-1, a body scan and self-validation. And a Safety section for the practical side — contacts, exit notes and digital privacy tips — kept only on your device."
  ],
  inside:["An 18-question relationship patterns check","Reflections that name patterns, not people","Grounding: breathing, 5-4-3-2-1, body scan","Self-validation for when you are shaken","Safety contacts, exit notes and digital privacy tips","Hotlines and next steps for staying, setting boundaries or leaving","Australian numbers included: 000 and 1800RESPECT","Not a diagnosis and not a crisis service","Private, one file, stays on your device"]
});
artFor(APPS[APPS.length - 1]).motif = "orbits";

APPS.push({
  slug:"pulse-plus", name:"Pulse Plus", cat:"sound", price:39, status:"live", ready:true,
  desc:"A neon music player in teal and magenta for the music you already own — add songs, build playlists, keep it all on your device.",
  tag:"Your music. On this device.",
  body:[
    "Pulse Plus is a music player with a late-night look: teal and magenta light over black and a player bar that stays out of the way. Add songs from your phone or computer and they stay in the app's own library, ready next time you open it.",
    "Like the ones you love, build playlists, search, shuffle and repeat. It plays your own files and nothing else: no tracks to stream, no account, nothing sent anywhere. It does not come with any music."
  ],
  inside:["Add your own songs from your device","Mp3, m4a, aac, wav, ogg, flac and opus files","Playlists you build and keep","Liked songs and a search box","Shuffle, repeat and volume","No account, no sign-in","Comes with no music — you bring your own","One file, works offline"]
});
artFor(APPS[APPS.length - 1]).motif = "wave";

APPS.push({
  slug:"nova", name:"Nova", cat:"wellness", price:39, status:"live", ready:true,
  desc:"Soft structure for a brain that runs on interest — tiny steps, short sprints, a mood check-in and a companion in three tones.",
  tag:"Productivity is optional. Regulation counts.",
  body:[
    "Nova is built for the days the list is the problem. Add the thing you have been avoiding and it shrinks it to foothills, sized to the energy you have today. A focus timer with a body double sits beside you while you work, in sprints from five minutes up, and a missed day is just a day.",
    "Talk to Nova as a friend, a coach or something more reflective. The replies are written in advance, not generated, so nothing you say leaves the phone. If what you type sounds like a crisis it stops coaching and puts Lifeline and 000 on the screen. Not medical care, and it says so."
  ],
  inside:["Tiny steps — tasks broken down to your energy level","Focus sprints with a body double","A 20-second mood and energy check-in","Calm tools: breathing and grounding","Insights that show patterns, not scores","A companion in three tones: friend, coach, reflective","Lifeline 13 11 14 and 000 one tap away","One file, works offline, nothing leaves your device"]
});
artFor(APPS[APPS.length - 1]).motif = "orbits";

APPS.push({
  slug:"rise-beyond", name:"Rise Beyond", cat:"narc", price:39, status:"live", ready:true,
  desc:"Four short regulation practices to watch and breathe along with — water, the Om, sound and a singing bowl.",
  tag:"Settle. Ground. Rise.",
  body:[
    "When your body is still on alert after the conversation has ended, thinking your way out rarely works. Rise Beyond gives the nervous system something slow to follow instead: ripples on still water, the Om moving across a lake, sound travelling through, a bowl's tone leaving it. Each has its own breathing count on screen, four in and a longer six or eight out.",
    "It is deliberately small. Four practices, one tap to start, one tap to stop, with the sound on or off as you like. Lifeline and 1800RESPECT are on the list screen. A calming tool, not therapy."
  ],
  inside:["Still Water — in for 4, out for 6","Sacred Center — the Om, moving on the water","Wave Listen — in for 4, out for 8","Bowl Resonance — one tone, a longer exhale","Video and sound built into the file","Sound on or off, your choice","1800RESPECT and Lifeline on the list screen","One file, works offline"]
});

APPS.push({
  slug:"uncluttered-path", name:"Uncluttered Path", cat:"home", price:39, status:"live", ready:true,
  desc:"A gentle decluttering companion for when the mountain of stuff stops you starting — two minutes, one surface, one less thing.",
  tag:"You don't have to finish the whole house today.",
  body:[
    "Most decluttering advice assumes you can simply get started. Uncluttered Path is for when you can't. It begins with your why, then offers micro-sessions of two to ten minutes with a timer: clear one surface, take one less thing, sort a single drawer into three piles. A finished session counts, however small.",
    "A room-by-room guide says where to begin and what to leave until later, and a companion answers in written text when you tell it you're stuck. There is a progress and wins page, a section on stopping the inflow, and ten principles for the long run. If what you type sounds like a crisis it puts Lifeline and 000 on screen. Everything stays on your device."
  ],
  inside:["Your Why, written once and kept","Micro-sessions of 2 to 10 minutes with a timer","Room-by-room guide, easiest first","A companion that answers when you say you're stuck","Progress and wins, kept as you go","Stop the inflow — habits that keep it gone","Ten core principles","Lifeline 13 11 14 and 000 one tap away","One file, works offline, nothing leaves your device"]
});

APPS.push({
  slug:"stillwater", name:"Stillwater", cat:"wellness", price:39, status:"live", ready:true,
  desc:"A private mood notebook kept on your phone — a check-in, a journal, a written coach and sounds made on the spot.",
  tag:"A quiet place, kept here.",
  body:[
    "Four short questions to set it up, and then it stays out of your way. Check in with one of five moods and a line if you want it remembered, watch the mood chart build over the weeks, and keep a journal where a few plain sentences are enough. Star the notes, replies and sounds you want to find again.",
    "A written coach answers when you say you feel stuck or can't wind down, and says plainly that it is not a person and not therapy. For quiet sessions of five, ten or twenty minutes there are sounds made in the app itself, nothing to download. If what you type sounds like a crisis it points to Lifeline and 000. Nothing leaves your device."
  ],
  inside:["A five-mood check-in with an optional line","A mood chart that builds over time","A journal for a few plain sentences","A written coach — not a person, not therapy","Sounds made on your device: rain, shore, a quiet room, a soft tone","Quiet sessions of 5, 10 or 20 minutes","Favourites for the notes and sounds you return to","Lifeline 13 11 14 and 000 one tap away","One file, works offline, nothing leaves your device"]
});
artFor(APPS[APPS.length - 1]).motif = "rings";

APPS.push({
  slug:"mysomni", name:"MySomni", cat:"sound", price:39, status:"live", ready:true,
  desc:"A quieter night. One sound only — binaural beats, a Tibetan singing bowl or a deep temple OM.",
  tag:"One sound. Then night.",
  body:[
    "MySomni plays a single voice at a time. No mix, no layers, nothing underneath. Pick binaural beats for headphones, a bronze singing bowl struck or sung from the rim, or a low temple OM, set a length from ten minutes to ninety or leave it open, and let it fade itself out.",
    "Every sound is made on your device as it plays, so there is nothing to stream, no account and no subscription. Journeys give you a ready-made evening if you do not want to choose. A calming sound, not medical care, and the Guide gives Lifeline and 000."
  ],
  inside:["Six binaural presets from delta to soft beta","Fifteen singing bowl tones, struck or rim-sung","Four deep OM chant voices","Timed sessions that fade out, or open-ended","Eight ready-made journeys","Favourites and recent sessions remembered","Sound made on your device, nothing streamed","Lifeline 13 11 14 and 000 in the Guide","One file, works offline"]
});
artFor(APPS[APPS.length - 1]).motif = "wave";

APPS.push({
  slug:"first-light", name:"First Light", cat:"wellness", price:39, status:"live", ready:true,
  desc:"A quiet sleep course — a diary, a steady rise time and three tools for the middle of the night.",
  tag:"Sleep is a skill. You can relearn it.",
  body:[
    "First Light is built around a few well-known sleep habits rather than a pile of tricks. Keep one rise time, even after a rough night. Keep the bed for sleep. Wind the day down. A diary takes three taps a day, and four short lessons explain the reasons in plain words.",
    "For the hours when sleep will not come there are night tools: 3am cards that take the pressure off, a paced breath you can do in a chair, and a worry dump to leave the thought outside the bed. Everything stays on your phone. Not medical care, and the app says so."
  ],
  inside:["A three-tap sleep diary: rise time, bed time, how rested","Four short lessons, starting with a steady rise time","3am cards for cannot start, woke mid-night, woke early","A paced breath: in 4, still 2, out 6","A worry dump to park the thought","A Path page with one small aim for the day","Lifeline 13 11 14 and 000 one tap away","One file, works offline, nothing leaves your device"]
});
artFor(APPS[APPS.length - 1]).motif = "rings";

APPS.push({
  slug:"budgetpilot", name:"BudgetPilot", cat:"money", price:39, status:"live", ready:true,
  desc:"A private monthly budget in your pocket — income, expenses, what is left, and a coach that answers in plain numbers.",
  tag:"Know what's left. Keep it private.",
  body:[
    "BudgetPilot keeps the month simple. Add your income, add what you spend, and four numbers update straight away: income, expenses, what is remaining and your savings rate. Nine everyday categories in Australian dollars, with a sample month to try it before you enter your own.",
    "Ask the coach how you are doing, or for a 50/30/20 split of your income, and it answers from your numbers. The replies are written in advance, not generated, so nothing is sent anywhere. General information, not financial advice, with the National Debt Helpline and Lifeline listed in the app."
  ],
  inside:["Income and expenses with live totals","Remaining and savings rate at a glance","Nine categories, in Australian dollars","A coach for a snapshot or a 50/30/20 plan","Insights that say where you stand","A sample month to try it first","National Debt Helpline 1800 007 007, Lifeline 13 11 14 and 000","One file, works offline, stays on your device"]
});
artFor(APPS[APPS.length - 1]).motif = "wave";

APPS.push({
  slug:"right-action-essentials", name:"Right Action Essentials", cat:"divine", price:39, status:"live", ready:true,
  desc:"A personal-year numerology companion — what this year is for, this month, today, and the next useful step.",
  tag:"Right action, not fortune-telling.",
  body:[
    "Enter a name and a birthday and Right Action places you in the nine-year cycle, then in the month and the day inside it. Each comes with a plain, constructive sentence about what the time is for and what not to start. Written in the spirit of Juno Jordan's calendar method, in original words.",
    "Look back and ahead across the cycle, add the people you love and see their year too, or name a problem in one honest sentence and get the right action for this year and this month. Everything stays on your phone."
  ],
  inside:["Today, this year and every month inside it","The nine-year cycle, past and future years","Add people and read their years","Name a problem, get the right action for it","What to start and what not to start this year","Original wording, not a copy of any book","Lifeline 13 11 14 and 000 if you type something that sounds like a crisis","One file, works offline, stays on your device"]
});
artFor(APPS[APPS.length - 1]).motif = "orbits";

APPS.push({
  slug:"palmistry-studio", name:"Palmistry Studio", cat:"divine", price:39, status:"live", ready:true,
  desc:"A quiet studio for reading your own left palm — add a photo, see the major lines, and learn what each one means.",
  tag:"Learn palmistry on your own hand.",
  body:[
    "Palmistry Studio teaches by showing. Add a clear photo of your left palm and it estimates the major lines and mounts from the creases in the picture, names your hand type, and explains each finding in plain language: strengths, growth edges and what the lines are said to mean.",
    "Beyond your own reading there is a palm map to explore, the hand types, a guided read, a short quiz and lessons for beginners. Your photo is read on your device and never uploaded. Educational and reflective, not medical advice and not a fortune."
  ],
  inside:["A photo reading of your left palm","Major lines and mounts, with a strength for each","Your hand type, in plain words","An explorable palm map","Hand types and a guided read","A short quiz and beginner lessons","Your photo stays on your device, nothing uploaded","Educational only, not medical advice or a fortune","One file, works offline"]
});
artFor(APPS[APPS.length - 1]).motif = "orbits";
