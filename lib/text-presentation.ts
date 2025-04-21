interface Slide {
  title: string
  content: string
}

/**
 * Creates a simple text representation of a presentation
 * This is used as a fallback when PowerPoint generation fails
 */
export function createTextPresentation(topic: string, slides: Slide[]): string {
  let textContent = `PRESENTATION: ${topic}\n\n`

  slides.forEach((slide, index) => {
    textContent += `SLIDE ${index + 1}: ${slide.title}\n`
    textContent += `${slide.content}\n\n`
  })

  return textContent
}
