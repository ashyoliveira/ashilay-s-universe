# Ashilay's Universe — Codex Instructions

## Project

Ashilay's Universe is an interactive personal portfolio built with Ruby on Rails.

The concept connects three worlds:

- Technology → The Lab
- Creative → The Studio
- Strategy → The Forge

Core statement:

"I don't fit in one box. I build between worlds."

The website should feel immersive, mysterious, editorial, futuristic and slightly magical.

Do not turn it into a generic developer portfolio.

## Stack

- Ruby on Rails
- ERB
- CSS
- Vanilla JavaScript
- Rails I18n

Do not add React, Vue, Tailwind, Bootstrap, gems, npm packages or other dependencies unless explicitly requested.

## Important files

- app/views/universe/index.html.erb
- app/views/layouts/application.html.erb
- app/assets/stylesheets/application.css
- app/javascript/application.js
- config/locales/pt-BR.yml
- config/locales/en.yml
- config/locales/es.yml

## Working rules

Always inspect the real repository before making changes.

Repository state is the technical source of truth.
PROJECT_CONTEXT.md is the product/design source of truth.

Before editing:

1. Read the relevant files.
2. Check if the feature already exists.
3. Look for duplicated or incorrectly nested HTML.
4. Preserve working functionality.
5. Make the smallest safe change.

Do not rewrite entire working files unnecessarily.

Do not rename existing CSS classes without checking HTML and JavaScript references.

Do not silently remove existing functionality.

## Languages

Supported locales:

- pt-BR
- en
- es

pt-BR is primary.

Preserve Rails I18n.

When adding interface copy, add corresponding translation keys to all three locales.

## Accessibility

Preserve:

- semantic HTML
- keyboard navigation
- text size controls
- high contrast
- reduced motion
- prefers-reduced-motion
- ARIA attributes
- VLibras

Accessibility must not be removed for visual effects.

## Themes

Two realities exist:

Midnight Universe:
- #0B0B16
- #151522
- #7657FF
- #E86AA6
- #86A873
- #E8B85C
- #F3EFF8

Daydream Universe:
- #F7F3FA
- #EEE8F4
- #181321
- #6547E8
- #C94F8A
- #668257
- #B47B25

## Responsive design

Always preserve:

- desktop
- notebook
- tablet
- mobile

Avoid horizontal overflow.

Custom pointer effects must be disabled on touch devices.

## Current architecture

00 / Portal
01 / The Universe
02 / Worlds
03 / Selected Work
04 / The Journey
05 / Capabilities
06 / Beyond the Work
07 / Contact
Footer

## Three worlds

Technology / The Lab / ◉ / violet

Creative / The Studio / ◇ / pink

Strategy / The Forge / ✦ / green + gold

They must feel like dimensions of the same universe, not three unrelated websites.

## Verification

After HTML changes:
- verify nesting
- verify Rails rendering
- verify translation keys

After JavaScript changes:
- check browser console
- preserve Turbo compatibility
- avoid duplicate listeners

After CSS changes:
- verify desktop and mobile
- verify Midnight and Daydream
- verify high contrast
- verify reduced motion

Do not make unrelated changes.