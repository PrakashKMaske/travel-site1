/*let Person = require('./modules/Person')

import Person from './modules/Person'

class Adult extends Person {
  payTaxes(){
    console.log(this.name + " payed taxes")
  }
}

let joel = new Person("Joel", "korv")
let michelle = new Adult("Michelle", "kimchi")

joel.greet()
michelle.greet()
michelle.payTaxes()
*/

import $ from 'jquery'
import MobileMenu from './modules/MobileMenu.js'
import RevealOnScroll from './modules/RevealOnScroll.js'
import StickyHeader from './modules/StickyHeader.js'

let mobileMenu = new MobileMenu()
let stickyHeader = new StickyHeader()
new RevealOnScroll($(".feature-item"), "85%")
new RevealOnScroll($(".testimonial"), "60%")
