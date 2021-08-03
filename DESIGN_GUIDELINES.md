# Design Guidelines

This document aims to specify and define the rules and patterns to follow when implementing and developing new features and components for NeoExpensive.

>This is a summary. For a more extensive version, components and UI Design, visit the publically available **[Figma file](https://www.figma.com/file/6Un7EU7SiFts19540phE7O/Neo?node-id=101%3A21)**.

## Table of contents
- [Design Guidelines](#design-guidelines)
  - [Table of contents](#table-of-contents)
  - [Color scheme](#color-scheme)
      - [Gray shades](#gray-shades)
  - [Typography](#typography)
      - [Web Embed](#web-embed)
  - [Spacing](#spacing)
  
  ## Color scheme

- **Accent**: `#8B46A3`
- **Pure White**: `#FFFFFF`

#### Gray shades
- **Gray 100**: `#DEE3EA`
- **Gray 200**: `#B2BDCD`
- **Gray 300**: `#5D7290`
- **Gray 400**: `#4F617A`
- **Gray 500**: `#404F64`
- **Gray 600**: `#323D4D`
- **Gray 700**: `#242C37`
- **Gray 800**: `#151A21`
- **Gray 900**: `#0B0E11`

## Typography

The fonts chosen for this project are (`Monstserrat`)[https://fonts.google.com/specimen/Montserrat] & (`Josefin`)[https://fonts.google.com/specimen/Josefin+Sans].

Both fonts are free and available on Google Fonts. Clean and bold headings, readable paragraph text and an overall versatile font.

We'll be using two of its styles:
- Montserrat Bold (`700`)

#### Web Embed

HTML's `link` method

```html
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
```

CSS/SCSS `@import`

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
```

CSS Rules

```scss
font-family: 'Montserrat', sans-serif;

// Bold
font-weight: 700;
```


![NeoExpensive typography](https://i.imgur.com/A1pz7UD.png)

Tag | Font Size | Line Height | Weight
--- | --------- | ----------- | ------
**H1** | 56px   | 90          | 700
**H2** | 40px   | 64          | 700
**H3** | 28px   | 45          | 700
**H4** | 20px   | 32          | 700
**P**  | 14px   | 22          | 500 - 700
**P (small)**   | 12px | 22   | 500 - 700

## Spacing

This is an approximation. On some circumstances other values will be used to ensure readability, consistency and visual balance, so make sure to also check the UI Design and the spacing used there.

![NeoExpensive spacing](https://i.imgur.com/gRIJAXA.png)
