import Error from "@/component/error/Index";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "404 error || SmartSentinels | AI",
};
const index = () => {
   return (
      <Wrapper>
         <Error />
      </Wrapper>
   )
}

export default index
