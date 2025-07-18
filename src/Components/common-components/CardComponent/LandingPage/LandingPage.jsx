import React from 'react'
import LandingPageNavbar from './LandingPageNavbar'
import LandingPageBanner from './LandingPageBanner'
import LandingPageSkillsS from './LandingPageSkillsS'
import LandingPageTestimonials from './LandingPageTestimonials'
import ContactUs from './ContectUs'
import LandingPageFooter from './LandingPageFooter'

function LandingPage() {
    return (
        <div>
            <LandingPageNavbar />
            <LandingPageBanner />
            <LandingPageSkillsS />
            <LandingPageTestimonials />
            <ContactUs />
            <LandingPageFooter />
        </div>
    )
}

export default LandingPage
