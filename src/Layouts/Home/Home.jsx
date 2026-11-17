import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../Shared-Components/Navbar/Navbar';
import SEO from '../../Shared-Components/SEO/SEO';
import StructuredData from '../../Shared-Components/StructuredData/StructuredData';
import Hero from '../../Components/Home-Components/Hero/Hero';
import CompanyHighlights from '../../Components/Home-Components/CompanyHighlights/CompanyHighlights';
import Offers from '../../Components/Home-Components/Offers/Offers';
import TravelPackages from '../../Components/Home-Components/TravelPackages/TravelPackages';
import InternationalPackages from '../../Components/Packages-Components/InternationalPackages/InternationalPackages';
import DomesticPackages from '../../Components/Packages-Components/DomesticPackages/DomesticPackages';
import CustomPackageForm from '../../Components/Packages-Components/CustomPackageForm/CustomPackageForm';
import WhyChooseUs from '../../Components/Home-Components/WhyChooseUs/WhyChooseUs';
import AboutRJGroups from '../../Components/Home-Components/AboutRJGroups/AboutRJGroups';
import Testimonials from '../../Components/Home-Components/Testimonials/Testimonials';
import CallToAction from '../../Components/Home-Components/CallToAction/CallToAction';
import CategoryBrowse from '../../Components/Packages-Components/CategoryBrowse/CategoryBrowse';
import Newsletter from '../../Shared-Components/Newsletter/Newsletter';
import Footer from '../../Shared-Components/Footer/Footer';
import { PAGES } from '../../config/seo.config';

function Home() {
    const pageMeta = PAGES.home;
    const breadcrumbList = [
        { name: 'Home', url: `${PAGES.home.path}` },
    ];

    // Refresh ScrollTrigger after mount so a browser refresh
    // (which restores scroll position) does not leave pinned
    // sections stuck and the page blank.
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                ScrollTrigger.refresh();
            } catch {
                /* never let a refresh error unmount the app */
            }
        }, 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SEO
                title={pageMeta.title}
                description={pageMeta.description}
                keywords={pageMeta.keywords}
                url={`${PAGES.domain}${pageMeta.path}`}
                type={pageMeta.type}
            />
            <StructuredData
                pageTitle={pageMeta.title}
                pageDescription={pageMeta.description}
                pageUrl={`${PAGES.domain}${pageMeta.path}`}
                breadcrumbList={breadcrumbList}
            />
            <Navbar />
            <Hero />
            <CompanyHighlights />
            <Offers />
            <InternationalPackages />
            <DomesticPackages />
            <TravelPackages />
            <CustomPackageForm />
            <CategoryBrowse />
            <WhyChooseUs />
            <AboutRJGroups />
            <Testimonials />
            <CallToAction />
            <Newsletter />
            <Footer />
        </>
    );
}

export default Home;
