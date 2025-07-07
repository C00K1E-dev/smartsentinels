import FooterThree from "@/layouts/footers/FooterThree"
import Breadcrumb from "../common/Breadcrumb"
import DocumentArea from "../common/DocumentArea"
import ContactArea from "./ContactArea"
import HeaderThree from "@/layouts/headers/HeaderThree"

const Contact = () => {
   return (
      <main>
         <HeaderThree />
         <Breadcrumb title="Contact" />
         <ContactArea />
         <DocumentArea />
         <FooterThree />
      </main>
   )
}

export default Contact
