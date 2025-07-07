import FooterOne from "@/layouts/footers/FooterOne"
import Brand from "./Brand"
import ChooseArea from "./ChooseArea"
import EventArea from "./EventArea"
import FaqArea from "./FaqArea"
import Hero from "./Hero"
import IntroArea from "./IntroArea"
import PartnerArea from "./PartnerArea"
import Team from "./Team"
import RoadMap from "./RoadMap"
import HeaderOne from "@/layouts/headers/HeaderOne"

const HomeOne = () => {
  return (
    <div className="home-purple-gradient">
      <HeaderOne />
      <Hero />
      <Brand />
      <ChooseArea />
      <IntroArea />
      <RoadMap />
      <Team />
      <PartnerArea />
      <EventArea />
      <FaqArea />
      <FooterOne />
    </div>
  )
}

export default HomeOne
