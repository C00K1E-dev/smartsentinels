import Link from "next/link"


const doc_data: string[] = ["Whitepaper", "Token Sale Terms", "Presentation", "Lightpaper"]

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
                                    <Link href="#">
                                       <span className="icon"><i className="fas fa-file-pdf"></i></span>
                                       {list}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                           <Link href="#" className="btn">Download All</Link>
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