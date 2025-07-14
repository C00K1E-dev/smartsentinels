import Documents from "@/pages/Documents";
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
      <Documents />
      <FooterOne />
    </Wrapper>
  )
}

export default index