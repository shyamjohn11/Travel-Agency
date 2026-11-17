import SEO from "../../Shared-Components/SEO/SEO";
import StructuredData from "../../Shared-Components/StructuredData/StructuredData";
import PackageHero from "../../Components/Packages-Components/PackageHero/PackageHero";
import DomesticPackages from "../../Components/Packages-Components/DomesticPackages/DomesticPackages";
import InternationalPackages from "../../Components/Packages-Components/InternationalPackages/InternationalPackages";
import PackageFAQ from "../../Components/Packages-Components/PackageFAQ/PackageFAQ";
import PackageCTA from "../../Components/Packages-Components/PackageCTA/PackageCTA";
import PopularPackages from "../../Components/Packages-Components/PopularPackages/PopularPackages";
import PackageInclusions from "../../Components/Packages-Components/PackageInclusions/PackageInclusions";
import ResortHotelPackages from "../../Components/Packages-Components/ResortHotelPackages/ResortHotelPackages";
import BookingProcess from "../../Components/Packages-Components/BookingProcess/BookingProcess";
import CustomPackageForm from "../../Components/Packages-Components/CustomPackageForm/CustomPackageForm";
import CategoryBrowse from "../../Components/Packages-Components/CategoryBrowse/CategoryBrowse";
import Navbar from "../../Shared-Components/Navbar/Navbar";
import Footer from "../../Shared-Components/Footer/Footer";
import { PAGES } from "../../config/seo.config";

export default function Packages() {
    const pageMeta = PAGES.packages;
    const breadcrumbList = [
        { name: 'Home', url: `${PAGES.home.path}` },
        { name: 'Packages', url: `${PAGES.packages.path}` },
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
            <PackageHero />
            <CategoryBrowse />
            <DomesticPackages />
            <InternationalPackages />
            <PopularPackages />
            <PackageInclusions />
            <ResortHotelPackages />
            <BookingProcess />
            <CustomPackageForm />
            <PackageFAQ />
            <PackageCTA />
            <Footer />
        </>
    );
}
