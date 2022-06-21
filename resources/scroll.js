const filter = document.getElementById("f-data")
const sectionScroll = document.getElementById('f-scroll')

console.log(filter)
console.log(sectionScroll)




const scrolled = sectionScroll.getBoundingClientRect()

window.addEventListener('scroll', function(e) {
    if (window.scrollY > 600) filter.classList.add('sticky')
    else filter.classList.remove('sticky')
})