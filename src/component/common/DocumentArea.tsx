import Link from "next/link"
import DocumentForm from "../forms/DocumentForm"
import Image from "next/image"

import docShape from "@/assets/img/images/document_shape.png"

const doc_data = [
  { name: "Whitepaper", file: "/assets/documents/smart-sentinels-whitepaper.pdf" },
  { name: "Token Sale Terms", file: "/assets/documents/token-sale-terms.pdf" },
  { name: "Presentation", file: "/assets/documents/presentation.pdf" },
  { name: "Lightpaper", file: "/assets/documents/lightpaper.pdf" }
]

const DocumentArea = () => {
   return (
      <section className="document-area">
         <div className="container">
            <div className="document-inner-wrap">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="section-title text-center mb-60">
                        <h2 className="title">Have Any Questions?</h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-8">
                     <div className="document-form-wrap">
                        <h4 className="title">Get In Touch Now</h4>
                        <DocumentForm />
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="document-wrap">
                        <h4 className="title">Read Documents</h4>
                        <ul className="list-wrap">
                           {doc_data.map((doc, i) => (
                              <li key={i}>
                                 <Link href={doc.file} target="_blank" download>
                                    <span className="icon"><i className="fas fa-file-pdf"></i></span>
                                    {doc.name}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                        <Link href="/assets/documents/smart-sentinels-whitepaper.pdf" className="btn" target="_blank" download>Download Whitepaper</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="document-shape">
            <Image src={docShape} alt="" className="alltuchtopdown" />
         </div>
      </section>
   )
}

export default DocumentArea
