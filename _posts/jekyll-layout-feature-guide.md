---
author_profile: true
bibtexurl: /assets/files/sample.bib
breadcrumbs: true
categories:
- documentation
citation: Doe, J. (2026). Example Research Paper.
comments: true
date: 2026-03-08
excerpt: Demonstration of all page layout features and components.
header:
  caption: Feature demonstration
  overlay_filter: 0.3
  overlay_image: /assets/images/hero.jpg
layout: single
link: "https://example.com"
modified: 2026-03-08
paperurl: /assets/files/sample-paper.pdf
read_time: true
related: true
share: true
slidesurl: /assets/files/sample-slides.pdf
tags:
- jekyll
- minimal-mistakes
- layout
- guide
title: Layout Feature Guide
type: Lecture
venue: Example Conference
---

# Layout Feature Guide

This page demonstrates **all major features supported by the layout**.

------------------------------------------------------------------------

## 1. Metadata

This post demonstrates:

-   Published date
-   Modified date
-   Reading time
-   Venue metadata
-   Citation block
-   External link

Check the **header area** above.

------------------------------------------------------------------------

## 2. Typography

### Heading Levels

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

------------------------------------------------------------------------

### Text formatting

**Bold text**

*Italic text*

~~Strikethrough~~

`inline code`

------------------------------------------------------------------------

### Blockquote

> This is an example blockquote used for notes or highlights.

------------------------------------------------------------------------

## 3. Code Blocks

``` python
def hello():
    print("Hello world")
```

``` javascript
const message = "Hello Jekyll"
console.log(message)
```

------------------------------------------------------------------------

## 4. Lists

### Unordered list

-   Item one
-   Item two
-   Item three

### Ordered list

1.  First
2.  Second
3.  Third

------------------------------------------------------------------------

## 5. Tables

  Feature         Supported
  --------------- -----------
  Sidebar         Yes
  Breadcrumbs     Yes
  Pagination      Yes
  Related posts   Yes

------------------------------------------------------------------------

## 6. Images

Example image:

![Example Image](/assets/images/sample.jpg)

------------------------------------------------------------------------

## 7. Buttons

[External Link](https://example.com){: .btn .btn--primary}

------------------------------------------------------------------------

## 8. Notices

{: .notice--info} Info notice block

{: .notice--warning} Warning notice block

{: .notice--success} Success notice block

------------------------------------------------------------------------

## 9. Embedded Content

### YouTube

{% include video id="dQw4w9WgXcQ" provider="youtube" %}

------------------------------------------------------------------------

## 10. Math (Optional)

If MathJax enabled:

$$
E = mc^2
$$

------------------------------------------------------------------------

## 11. Footnotes

Example sentence with a footnote.[^1]

------------------------------------------------------------------------

## 12. Related Posts

If related posts are enabled, they appear **below the article**.

------------------------------------------------------------------------

## 13. Comments

If comments provider is configured, the **comment section will appear at
the bottom**.

------------------------------------------------------------------------

## 14. Pagination

Navigate using the **Previous / Next buttons** below.

------------------------------------------------------------------------

## 15. Social Sharing

If enabled, share buttons appear below the post.

------------------------------------------------------------------------

## 16. Taxonomy

Check the **tags and categories** in the footer.

------------------------------------------------------------------------

## 17. Downloads Section

If the following fields are set in frontmatter:

-   paperurl
-   slidesurl
-   bibtexurl

The layout will automatically generate **download buttons**.

------------------------------------------------------------------------

## 18. Breadcrumbs

Breadcrumb navigation appears at the **top of the page**.

------------------------------------------------------------------------

## 19. Sidebar

If `author_profile: true`, the **author sidebar** will appear.

------------------------------------------------------------------------

## 20. Hero Banner

Configured in frontmatter:

header.overlay_image

------------------------------------------------------------------------

# End of Guide

[^1]: This is a footnote example.
