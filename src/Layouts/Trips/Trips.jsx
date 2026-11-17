import TripsHero from "../../Components/Trips-Conponents/TripsHero/TripsHero";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import TravelStatistics from "../../Components/Trips-Conponents/TravelStatistics/TravelStatistics";
import FeaturedDestinations from "../../Components/Trips-Conponents/FeaturedDestinations/FeaturedDestinations";
import ExploreExperiences from "../../Components/Trips-Conponents/ExploreExperiences/ExploreExperiences";
import DomesticInternational from "../../Components/Trips-Conponents/DomesticInternational/DomesticInternational";
import WhyRJGroups from "../../Components/Trips-Conponents/WhyRJGroups/WhyRJGroups";
import TestimonialsCTA from "../../Components/Trips-Conponents/TestimonialsCTA/TestimonialsCTA";
import SEO from "../../Shared-Components/SEO/SEO";
import StructuredData from "../../Shared-Components/StructuredData/StructuredData";
import { PAGES } from "../../config/seo.config";
import TravelledPlacesGallery from "../../Components/Trips-Conponents/TravelledPlacesGallery/TravelledPlacesGallery";

function Trips() {
    const pageMeta = PAGES.trips;
    const breadcrumbList = [
        { name: 'Home', url: `${PAGES.home.path}` },
        { name: 'Trips', url: `${PAGES.trips.path}` },
    ];

    return (
        <>
            <Navbar />
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
            <TripsHero />
            <TravelStatistics />
            <FeaturedDestinations />
            <TravelledPlacesGallery />
            <ExploreExperiences />
            <DomesticInternational />
            <WhyRJGroups />
            <TestimonialsCTA />
            <Footer />
        </>
    );
}

export default Trips;
