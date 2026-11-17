import Navbar from '../../Shared-Components/Navbar/Navbar';
import ContactHero from "../../Components/Contact-Components/ContactHero/ContactHero";
import ContactInformation from '../../Components/Contact-Components/ContactInformation/ContactInformation';
import ContactEnquiry from '../../Components/Contact-Components/ContactEnquiry/ContactEnquiry';
import WhyContactRJ from '../../Components/Contact-Components/WhyContactRJ/WhyContactRJ';
import OfficeLocation from '../../Components/Contact-Components/OfficeLocation/OfficeLocation';
import ContactFAQ from '../../Components/Contact-Components/ContactFAQ/ContactFAQ';
import ContactFinalCTA from '../../Components/Contact-Components/ContactFinalCTA/ContactFinalCTA';
import Footer from '../../Shared-Components/Footer/Footer';
import SEO from "../../Shared-Components/SEO/SEO";
import StructuredData from "../../Shared-Components/StructuredData/StructuredData";
import { PAGES } from "../../config/seo.config";

function Contact() {
    const pageMeta = PAGES.contact;
    const breadcrumbList = [
        { name: 'Home', url: `${PAGES.home.path}` },
        { name: 'Contact Us', url: `${PAGES.contact.path}` },
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
            <ContactHero />
            <ContactInformation />
            <ContactEnquiry />
            <WhyContactRJ />
            <OfficeLocation />
            <ContactFAQ />
            <ContactFinalCTA />
            <Footer />
        </>
    );
}

export default Contact;
