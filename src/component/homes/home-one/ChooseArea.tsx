import Image, { StaticImageData } from "next/image";

import choose_thumb_1 from "@/assets/img/update/bg/bg-gradient1-1.jpg";
import choose_thumb_2 from "@/assets/img/update/normal/why_1-1.png";

import icon_1 from "@/assets/img/update/icon/feature-icon1-1.svg";
import icon_2 from "@/assets/img/update/icon/feature-icon1-2.svg";
import icon_3 from "@/assets/img/update/icon/feature-icon1-3.svg";

interface AmountDataType {
  id: number;
  title: string;
  price: string;
  skill: string;
  value: string;
  value_2: string;
}

interface ChooseDataType {
  id: number;
  icon: StaticImageData;
  title: string;
  price?: string;
  desc: string;
}

const amount_data: AmountDataType[] = [
  {
    id: 1,
    title: "Projected SSTL Value",
    price: "$0.36 (Utility-Based Estimate)",
    skill: "70%",
    value: "50,000",
    value_2: "180,000",
  },
  {
    id: 2,
    title: "AI Agent Yield Projection",
    price: "Avg SSTL: $0.36",
    skill: "80%",
    value: "60,000",
    value_2: "216,000",
  },
  {
    id: 3,
    title: "Estimated Breakeven",
    price: "Q2 2026 (Based on PoUW yield)",
    skill: "40%",
    value: "20,000",
    value_2: "80,000",
  },
];

const choose_data: ChooseDataType[] = [
  {
    id: 1,
    icon: icon_1,
    title: "Utility-Backed Token",
    price: "Real AI Workload",
    desc: "SSTL is generated by AI agents performing real tasks like audits, support, or workflow automation — not speculation.",
  },
  {
    id: 2,
    icon: icon_2,
    title: "Sustainable Emissions",
    price: "Proof of Useful Work",
    desc: "Tokens are only minted when AI agents are active. Productivity powers supply, ensuring fair and efficient issuance.",
  },
  {
    id: 3,
    icon: icon_3,
    title: "Early Entry Advantage",
    price: "Lowest Token Price",
    desc: "Seed contributors access SSTL at its base valuation — before agents go live and utility drives real demand.",
  },
];

const ChooseArea = () => {
  return (
    <div className="wcu-area-1 pt-130 pb-140 position-relative" id="feature">
      <div className="bg-gradient-1">
        
      </div>
      <div className="container">
        <div className="mb-25">
          <div className="row gy-5">
            <div className="col-lg-7">
              <div className="section-title mb-0">
                <h2 className="title style2">Why You Should Join the SSTL Seed Round</h2>
                <p className="sec-text">
                  SSTL isn’t just a token — it’s the fuel behind a decentralized AI ecosystem. Invest early and be part of a future
                  where AI agents perform valuable work and generate real yield through Proof of Useful Work.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="wcu-thumb text-center alltuchtopdown">
                <Image src={choose_thumb_2} alt="SmartSentinels Illustration" />
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-5 justify-content-between">
          <div className="col-lg-5">
            <div className="wcu-amount-quantity">
              <div className="amount">
                <h5 className="title">Initial Investment (Projection)</h5>
                <p className="price">$50,000</p>
              </div>
              <div className="quantity">
                <h5 className="title">SSTL Tokens</h5>
                <p className="price">500,000 SSTL</p>
              </div>
            </div>
            <ul className="wcu-price-progress-wrap">
              {amount_data.map((item) => (
                <li key={item.id}>
                  <h6 className="progress-wrap-title">{item.title}</h6>
                  <p className="progress-wrap-text">{item.price}</p>
                  <div className="skill-feature">
                    <div className="progress">
                      <div className="progress-bar" style={{ width: item.skill }}></div>
                    </div>
                    <div className="progress-value">
                      <span>${item.value}</span>
                      <span>${item.value_2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-6">
            {choose_data.map((item) => (
              <div key={item.id} className="feature-card">
                <div className="feature-card-icon">
                  <Image src={item.icon} alt={`${item.title} Icon`} />
                </div>
                <div className="feature-card-details">
                  <h4 className="feature-card-title">{item.title}</h4>
                  {item.price && <p className="feature-card-text">{item.price}</p>}
                  <p className="feature-card-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseArea;
