import Image from "next/image";
import Link from "next/link";
import styles from "../../../../public/assets/css/herotext.module.css";
import hero_thumb from "@/assets/img/update/hero/hero-1-1.png";
import CountdownClock from "@/ui/CountDownClock";

const Hero = () => {
  return (
    <div className="hero-wrapper hero-1">
      <div className="hero-bg-gradient"></div>

      <div className="ripple-shape">
        <span className="ripple-1"></span>
        <span className="ripple-2"></span>
        <span className="ripple-3"></span>
        <span className="ripple-4"></span>
        <span className="ripple-5"></span>
      </div>

      <div className="container">
        <div className="hero-style1">
          <div className="row flex-row-reverse">
            <div className="col-lg-3">
              <div className="hero-thumb alltuchtopdown">
                <Image src={hero_thumb} alt="SmartSentinels Hero Image" />
              </div>
            </div>

            <div className="col-lg-9">
              <h1 className="hero-title">SmartSentinels</h1>
              <h2 className="title style2">AI Agents. Real Work. Real Rewards.</h2>
              <h2 className="title_style2">Powered by Proof of Useful Work (PoUW)</h2>

              <p className="sec-text">
                Join the future of decentralized AI with{" "}
                <span className={styles.yellow}>Smart Sentinels</span>, where real devices like{" "}
                <span className={styles.green}>Jetson Orin</span> and{" "}
                <span className={styles.green}>UM790 Pro</span> run autonomous AI agents that generate SSTL tokens
                through actual productivity—auditing smart contracts, managing AI support, and more.
              </p>

              <p className="sec-text">
                Users who mint NFTs from dedicated collections gain access to physical devices running customizable AI agents. These agents can perform a wide range of real-world tasks — from auditing smart contracts, to handling appointment bookings for medical offices, managing client intake for law firms, or even acting as AI support agents for customer service. The possibilities are limitless. As long as the agent is working and providing value, it generates SSTL tokens. NFT holders are directly linked to the productivity of the device, forming the foundation of our hardware-backed, Proof of Useful Work ecosystem.
              </p>

              <div className="btn-wrap">
                <Link href="/fundraise" className="btn btn">
                  Contribute Now
                </Link>
                <Link href="/whitepaper" className="btn btn">
                  Read Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* === Countdown Box === */}
        <div className="hero-countdown-wrap">
          <h2 className="hero-countdown-wrap-title">Seed Round Ends In</h2>

          <ul className="skill-feature_list">
            <li><span>Round Type:</span> Private Strategic Raise</li>
            <li><span>Token Price:</span> Starts at $0.015</li>
            <li><span>Mechanism:</span> Dynamic Pricing Based on Demand</li>
          </ul>

          <div className="skill-feature">
            <div className="progress">
              <div className="progress-bar" style={{ width: "32%" }}></div>
            </div>
            <div className="progress-value-max">
              Live Progress: $144,000+ Raised
            </div>
          </div>

          <p className="sec-text"> 
  This private Seed Round marks Phase 1 of our capital roadmap. We&#39;re offering up to 5% of the total SSTL supply
  at an early-stage valuation, fueling the development of the SmartSentinels platform, expansion of the AI agent
  network, and the foundations of a decentralized Proof of Useful Work (PoUW) ecosystem designed to scale across industries.
</p>

          <ul className="skill-feature_list style2">
            <li><strong>25%</strong> unlocked at TGE</li>
            <li><strong>75%</strong> vested linearly over 6 months</li>
            <li><strong>5,000,000</strong> SSTL allocated in this round</li>
          </ul>

          <div className="banner-countdown-wrap">
            <div className="coming-time" data-countdown="2024/8/29">
              <CountdownClock />
              <p className="sec-text">
                SmartSentinels will expand across four funding phases — from angel participation to strategic VC support,
                community launchpads, and DAO-driven growth. Now is your chance to join at the foundation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
