import Docs from "@/component/homes/home-one/Docs";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";


export const metadata = {
  title: "Smart Sentinels | AI",
};
const index = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <Docs />
      <FooterOne />
    </Wrapper>
  )
}

export default index