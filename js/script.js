const burger = document.querySelector(".header__burger")
if (burger) {
  let opened = false
  let busy = false
  burger.addEventListener("click", () => {
    if (busy) return
    busy = true
    if (!opened) {
      burger.classList.add("merge")
      setTimeout(() => {
        burger.classList.add("cross")
      }, 600)
      setTimeout(() => {
        opened = true
        busy = false
      }, 900)
    } else {
      burger.classList.remove("cross")
      setTimeout(() => {
        burger.classList.remove("merge")
      }, 300)
      setTimeout(() => {
        opened = false
        busy = false
      }, 600)
    }
  })
}


const categoriesItem = document.querySelectorAll(".categories__item")
categoriesItem.forEach(box => {
  box.addEventListener("mouseenter", () => {
    void box.offsetWidth
    box.classList.add("active")
  })
})
categoriesItem.forEach(box => {
  box.addEventListener("mouseleave", () => {
    box.classList.remove("active")
  })
})
function initSlider(sliderSelector, slideSelector) {
    const sliders = document.querySelectorAll(sliderSelector)
    sliders.forEach(slider => {
        const track = slider.querySelector("[class$='__track']")
        const prevBtn = slider.querySelector("[class$='__btn-prevent']")
        const nextBtn = slider.querySelector("[class$='__btn-next']")

        if (!track || !prevBtn || !nextBtn) return
        const originalSlides = [
            ...track.querySelectorAll(slideSelector)
        ]

        if (originalSlides.length === 0) return
        const slidesCount = originalSlides.length
        const cloneSets = 2
        const positionsWrapper =
            slider.querySelector("[class$='__positions']")
        const positions = positionsWrapper
            ? [
                ...positionsWrapper.querySelectorAll(
                    "[class$='__position']"
                )
            ]
            : []

        for (let i = 0; i < cloneSets; i++) {

            originalSlides
                .slice()
                .reverse()
                .forEach(slide => {
                    track.prepend(
                        slide.cloneNode(true)
                    )
                })
        }

        for (let i = 0; i < cloneSets; i++) {
            originalSlides.forEach(slide => {
                track.append(
                    slide.cloneNode(true)
                )
            })
        }

        const slides = [
            ...track.querySelectorAll(slideSelector)
        ]

        let currentIndex =
            slidesCount * cloneSets
        let isAnimating = false

        function updatePositions() {
            if (!positions.length) return
            const positionIndex =
                currentIndex % slidesCount
            positions.forEach(position => {
                position.classList.remove("active")
            })

            if (positions[positionIndex]) {
                positions[positionIndex]
                    .classList.add("active")
            }
        }

        function getSlideWidth() {
            const slideWidth =
                slides[0].getBoundingClientRect().width
            const styles =
                window.getComputedStyle(track)
            const gap =
                parseFloat(styles.columnGap) ||
                parseFloat(styles.gap) ||
                0
            return slideWidth + gap
        }

        function updateSlider(animate = true) {
            track.style.transition =
                animate
                    ? "transform .7s ease-in-out"
                    : "none"
            track.style.transform =
                `translateX(-${currentIndex * getSlideWidth()}px)`
            updatePositions()
        }

        nextBtn.addEventListener("click", () => {
            if (isAnimating) return
            isAnimating = true
            currentIndex++
            updateSlider()
        })

        prevBtn.addEventListener("click", () => {
            if (isAnimating) return
            isAnimating = true
            currentIndex--
            updateSlider()
        })

        track.addEventListener("transitionend", () => {
            if (
                currentIndex >=
                slidesCount * (cloneSets + 1)
            ) {
                currentIndex -= slidesCount
                updateSlider(false)
            }

            if (
                currentIndex <
                slidesCount * cloneSets
            ) {

                currentIndex += slidesCount
                updateSlider(false)
            }
            isAnimating = false
        })

        updateSlider(false)

        window.addEventListener(
            "resize",
            () => updateSlider(false)
        )
    })
}
initSlider(
  ".bestsellers-slider",
  ".bestsellers-cards"
)

initSlider(
  ".categories-slider",
  ".categories__item"
)

initSlider(
  ".blog-slider",
  ".blog__item"
)

initSlider(
  ".hookahs-slider",
  ".hookahs-cards--tablet"
)

const paginationButtons = document.querySelectorAll(".pagination__item")
const hookahsSections = document.querySelectorAll(".hookahs")
paginationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const page = button.dataset.page
        hookahsSections.forEach(section => {
            const desktopItems = section.querySelectorAll(
                ".hookahs-cards--desktop .hookahs-cards__item"
            )
            const mobileSlides = section.querySelectorAll(
                ".hookahs-slider .hookahs-cards--tablet"
            )
            const hookahsSlider = section.querySelector(
                ".hookahs-slider"
            )

            desktopItems.forEach(item => {
                if (item.dataset.page === page) {
                    item.style.display = ""
                } else {
                    item.style.display = "none"
                }
            })

            mobileSlides.forEach(slide => {
                const item = slide.querySelector(
                    ".hookahs-cards__item"
                )
                if (item && item.dataset.page === page) {
                    slide.style.display = ""
                } else {
                    slide.style.display = "none"
                }
            })

            const hasDesktopCards = [...desktopItems].some(item => {
                return item.dataset.page === page
            })

            const hasMobileCards = [...mobileSlides].some(slide => {
                const item = slide.querySelector(
                    ".hookahs-cards__item"
                )
                return item && item.dataset.page === page
            })

            const hasCards = hasDesktopCards || hasMobileCards
            if (hasCards) {
                section.style.display = ""
            } else {
                section.style.display = "none"
            }

            if (hookahsSlider) {
                const prevButton = hookahsSlider.querySelector(
                    ".hookahs-slider__btn-prevent"
                )
                const nextButton = hookahsSlider.querySelector(
                    ".hookahs-slider__btn-next"
                )
                const positions = hookahsSlider.querySelector(
                    ".hookahs-slider__positions"
                )
                if (hasCards) {
                    if (prevButton) {
                        prevButton.style.display = ""
                    }
                    if (nextButton) {
                        nextButton.style.display = ""
                    }
                    if (positions) {
                        positions.style.display = ""
                    }
                } else {
                    if (prevButton) {
                        prevButton.style.display = "none"
                    }
                    if (nextButton) {
                        nextButton.style.display = "none"
                    }
                    if (positions) {
                        positions.style.display = "none"
                    }
                }
            }
        })

        paginationButtons.forEach(button => {
            button.classList.remove("active")
        })
        button.classList.add("active")

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
})

const firstPageButton = document.querySelector(
    '.pagination__item[data-page="1"]'
)
if (firstPageButton) {
    firstPageButton.click()
}