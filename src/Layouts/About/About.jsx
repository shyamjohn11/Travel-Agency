import AboutHero from "../../Components/About-Components/AboutHero/AboutHero";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import OurStory from "../../Components/About-Components/OurStory/OurStory";
import CompanyOverview from "../../Components/About-Components/CompanyOverview/CompanyOverview";
import MissionVision from "../../Components/About-Components/MissionVision/MissionVision";
import OurCoreValues from "../../Components/About-Components/OurCoreValues/OurCoreValues";
import WhyChooseRJ from "../../Components/About-Components/WhyChooseRJ/WhyChooseRJ";
import SEO from "../../Shared-Components/SEO/SEO";
import StructuredData from "../../Shared-Components/StructuredData/StructuredData";
import { PAGES } from "../../config/seo.config";

function About() {
    const pageMeta = PAGES.about;
    const breadcrumbList = [
        { name: 'Home', url: `${PAGES.home.path}` },
        { name: 'About Us', url: `${PAGES.about.path}` },
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
            <AboutHero />
            <OurStory />
            <CompanyOverview />
            <MissionVision />
            <OurCoreValues />
            <WhyChooseRJ />
            <Footer />
        </>
    );
}

export default About;
