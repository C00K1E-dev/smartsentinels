import Image from "next/image";

import intro_thumb from "@/assets/img/update/normal/intro_1-1.png";

interface DataType {
   id: number;
   title: string;
   desc: JSX.Element;
}[];

const intro_data: DataType[] = [
   {
      id: 1,
      title: "Who We Are",
      desc: (
         <>
            SmartSentinels is a decentralized network of AI-powered devices running autonomous agents.
            These agents perform valuable tasks—such as auditing smart contracts—and generate tokens through a Proof of Useful Work mechanism.
         </>
      ),
   },
   {
      id: 2,
      title: "Why It Matters",
      desc: (
         <>
            Instead of wasting energy like traditional mining, SmartSentinels puts computation to work. Investors back real-world utility, and
            contributors can stake hardware or mint NFTs to share in the generated rewards.
         </>
      ),
   },
   {
      id: 3,
      title: "A New Model",
      desc: (
         <>
            Our ecosystem ties together AI, blockchain, and hardware ownership into one seamless experience—where every second of useful work
            by a Sentinel brings measurable value back to the community.
         </>
      ),
   },
];

const IntroArea = () => {
   return (
      <div className="pt-130 overflow-hidden bg-black2">
         <div className="container">
            <div className="row">
               <div className="col-xl-6">
                  <div className="section-title mb-45">
                     <h2 className="title style2">Introducing SmartSentinels</h2>
                     <p className="sec-text">Where AI earns. And you benefit.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-between">
               <div className="col-xl-4">
                  {intro_data.map((item) => (
                     <div key={item.id} className="intro-wrap">
                        <h6 className="intro-wrap-title">{item.title}</h6>
                        <p className="intro-wrap-text">{item.desc}</p>
                     </div>
                  ))}
               </div>
               <div className="col-xl-6">
                  <div className="intro-thumb1 alltuchtopdown">
                     <Image src={intro_thumb} alt="img" />
                  </div>
                  <div className="intro-wrap mt-50">
                     <h6 className="intro-wrap-title">Our Mission & Vision</h6>
                     <p className="intro-wrap-text">
                        To unlock the real-world value of AI by turning devices into autonomous workers. We empower contributors to earn through
                        purpose-driven mining and give businesses access to decentralized, on-demand intelligence.
                     </p>
                     <p className="intro-wrap-text mt-40">
                        The SmartSentinels network brings together AI, utility, and ownership. Our mission is to create a new class of digital labor,
                        where every action performed by an agent is transparent, auditable, and rewarded.
                     </p>
                     <p className="intro-wrap-text mt-40">
                        Join the decentralized workforce revolution—where AI works, devices earn, and you hold the key.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default IntroArea;
