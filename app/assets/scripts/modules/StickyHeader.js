import $ from 'jquery'
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'
import smoothScroll from 'jquery-smooth-scroll'

class StickyHeader {
  constructor(){
    this.siteHeader = $(".site-header")
    this.trigger = $(".large-hero__title")
    this.createHeaderWaypoint()
    this.pageSections= $(".page-section")
    this.createPageSectionWaypoints()
    this.headerLinks = $(".primary-nav a")
    this.addSmoothScrolling()
  }

  createHeaderWaypoint() {
    let that = this
    new Waypoint({
      element: this.trigger[0],
      handler: function(direction) {
        if(direction === "down"){
          that.siteHeader.addClass("site-header--dark")
        } else {
          that.siteHeader.removeClass("site-header--dark")
        }
      }
    });
  }

  addSmoothScrolling() {
    console.log(this.headerLinks)
    this.headerLinks.smoothScroll()
  }

  createPageSectionWaypoints() {
    let that = this;
    this.pageSections.each( function() {
      let currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: (direction) => {
          if (direction === "down"){
            let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link")
            that.headerLinks.removeClass("is-current-link")
            $(matchingHeaderLink).addClass("is-current-link")
          }else {

          }
        },
        offset: "18%"
      })
      new Waypoint({
        element: currentPageSection,
        handler: (direction) => {
          if (direction === "up"){
            let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link")
            that.headerLinks.removeClass("is-current-link")
            $(matchingHeaderLink).addClass("is-current-link")
          }else {

          }
        },
        offset: "-40%"
      })
    })
  }
}

export default StickyHeader
