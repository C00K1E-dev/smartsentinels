import Login from "@/component/login";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Login SmartSentinels | AI",
};
const index = () => {
   return (
      <Wrapper>
         <Login />
      </Wrapper>
   )
}

export default index