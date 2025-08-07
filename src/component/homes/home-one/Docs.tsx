import Link from "next/link"


const doc_data = [
  { name: "Whitepaper", file: "/assets/documents/smart-sentinels-whitepaper.pdf" },
  { name: "Token Sale Terms", file: "/assets/documents/token-sale-terms.pdf" },
  { name: "Presentation", file: "/assets/documents/presentation.pdf" },
  { name: "Lightpaper", file: "/assets/documents/lightpaper.pdf" }
]

const Docs = () => {
   return (
      <>
         
         <section className="document-area">
            <div className="container">
               <div className="document-inner-wrap">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="section-title text-center mb-60">
                           <h2 className="title">Read Documents</h2>
                        </div>
                     </div>
                  </div>
                  <div className="row justify-content-center">
                     <div className="col-lg-6">
                        <div className="document-wrap">
                           <ul className="list-wrap">
                              {doc_data.map((list, i) => (
                                 <li key={i}>
                                    <Link href={list.file} target="_blank">
                                       <span className="icon"><i className="fas fa-file-pdf"></i></span>
                                       {list.name}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
           
         </section>
         
      </>
   )
}
export default Docs