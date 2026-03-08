# Dark Factory — Homepage Specification

## Page Purpose

The homepage is the **public entrance to the Dark Factory**.

Visitors should feel like they are standing **in the halls of Raid Guild castle**, hearing rumors of strange machines operating deep below.

The page should:

- create intrigue
- hint at hidden systems and agents
- invite visitors to **Raid Guild Discord**
- hide a **secret path into the prototype UI**

The page should **not clearly explain the product**.

It should feel like a **rumor of forbidden machinery**.

---

# Page Route

```
/
```

Hidden prototype route:

```
/dashboard
```

Access only via **easter egg interaction**.

---

# Visual Theme

The page represents **the upper halls of the castle above the Dark Factory**.

Visual environment:

- candlelit stone hall
- distant rumble of machinery below
- strange runic glow leaking through cracks in the floor

Colors should remain within the **Dark Factory palette**.

Background should feel **dark, atmospheric, medieval**.

---

# Layout Overview

Sections:

```
Hero Section
Rumors of the Factory
How the Machines Whisper
Invitation to the Guild
Hidden Entrance (Easter Egg)
```

---

# Hero Section

## Layout

Full-width hero.

Background artwork.

Centered title and tagline.

---

## Title

Use **IM Fell**.

```
The Dark Factory
```

---

## Tagline

```
Beneath the Raid Guild castle, strange machinery turns.
```

---

## Subtext

```
Deep below the stone halls, past the forgotten dungeons and sealed vaults,
a factory of arcane design hums in the darkness.

Agents move unseen.
Scrolls are written by unseen hands.
Ideas are forged into artifacts.

Few know what truly happens there.
Fewer still have seen it.
```

---

## Hero Artwork Placeholder

Component:

```
HeroArtwork
```

Image prompt:

```
dark fantasy castle interior hall lit by torches, ancient stone architecture, mysterious runic glow coming from cracks in the floor, hint of machinery far below, moody cinematic lighting, high detail dark fantasy concept art
```

---

# Section: Rumors of the Factory

## Layout

Two-column section.

Left: text.

Right: artwork.

---

## Heading

```
Rumors from Below
```

---

## Copy

```
The guild scribes speak quietly of it.

A hidden workshop buried beneath the castle foundations.

They say dwarven machines grind endlessly there.
That strange agents take tasks from unseen ledgers.
That scrolls emerge written before the ink has dried.

No guildmaster claims ownership of the place.

And yet the machinery never stops.
```

---

## Artwork Placeholder

Component:

```
FactoryRumorArtwork
```

Image prompt:

```
massive underground dwarven machinery deep beneath a castle, gears and pipes and glowing runes, dark fantasy industrial laboratory, magical engines and alchemical devices, mysterious atmosphere
```

---

# Section: How the Machines Whisper

This section hints at the system.

---

## Heading

```
How the Machines Whisper
```

---

## Copy

```
Some believe the factory listens.

Tasks appear on iron plates.
Agents arrive to claim them.
Work begins without command.

Research is gathered.
Drafts are written.
Images conjured from the ether.

And when the work is complete,
a human hand must still seal the wax.

Only then does the machine fall silent.
```

---

## Visual Element

Simple animated icons:

```
Scroll → Gear → Crystal → Seal
```

Representing:

```
Task
Agent
Artifact
Approval
```

---

# Section: Invitation to the Guild

This is the main CTA.

---

## Heading

```
The Guild Halls Are Open
```

---

## Copy

```
Those who seek answers rarely find them alone.

The Raid Guild gathers explorers, builders, and machinists
who are not afraid to descend into strange places.

If you wish to learn more,
join the guild halls and listen for whispers of the factory.
```

---

## CTA Button

Text:

```
Enter the Raid Guild Discord
```

Link placeholder:

```
https://discord.gg/raidguild
```

Button style:

```
bg-forgeGold
text-black
hover glow
```

---

# Section: A Warning

Small atmospheric block.

---

## Text

```
Not all doors in the castle are meant to be opened.

If you hear the machinery beneath your feet,
best keep walking.

Or…

follow the sound.
```

---

# Easter Egg — Hidden Factory Entrance

A hidden interaction unlocks the prototype UI.

The goal is **playful discovery**.

---

# Interaction Design

Hidden rune symbols appear in the UI.

Example:

```
⚙  🜂  ◯
```

These runes are scattered in the page design.

Click pattern unlocks the entrance.

---

## Secret Click Pattern

Sequence:

```
Rune Gear
Rune Circle
Rune Flame
```

If clicked in the correct order:

```
⚙ → ◯ → 🜂
```

Then:

Reveal hidden panel.

---

# Hidden Panel

Panel text:

```
The machinery recognizes your curiosity.

A narrow stairwell opens beneath the stone floor.

Do you dare descend?
```

Button:

```
Descend into the Factory
```

Link:

```
/dashboard
```

---

# Alternate Easter Egg (Optional)

Typing sequence:

```
/enter
```

Or:

```
factory
```

Triggers the same unlock.

---

# Footer

Simple dark footer.

Text:

```
Raid Guild Experimental Systems Division
```

Subtext:

```
Some machines should remain hidden.
```

---

# Artwork Assets Required

The coding agent should create placeholder components for these images.

---

## 1 Hero Castle Interior

Prompt:

```
dark fantasy medieval castle interior hall lit by torches, stone arches, mysterious glow from beneath the floor hinting at machinery below, cinematic lighting, highly detailed fantasy concept art
```

---

## 2 Underground Factory

Prompt:

```
massive underground dwarven factory beneath a castle, gears and pipes, magical machinery powered by glowing runes, alchemical laboratory, dark fantasy industrial atmosphere
```

---

## 3 Arcane Workflow Machine

Prompt:

```
ancient magical machine with rotating gears and glowing runes representing an arcane workflow engine, dwarven engineering, fantasy industrial machinery
```

---

# Page Animation Ideas

Subtle background effects:

- slow ember particles
- rune glow flicker
- faint machine rumble sound (optional)

---

# Implementation Notes (Next.js)

Homepage should be built using:

```
app/page.tsx
```

Components:

```
HeroSection
RumorSection
WhisperSection
GuildCTA
HiddenEntrance
Footer
```

Easter egg logic:

```
useState runeSequence
detect click order
unlock hidden panel
```

---

# Success Criteria

The homepage should:

- feel like **the entrance to a secret underground system**
- spark curiosity about the Dark Factory
- drive users to **Raid Guild Discord**
- reward curious users with **secret prototype access**

Visitors should leave thinking:

> _Something strange is happening beneath this castle._
