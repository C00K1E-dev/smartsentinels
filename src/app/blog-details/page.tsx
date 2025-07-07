import BlogDetails from "@/component/blogs/blog-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Smart Sentinels | AI",
};
const index = () => {
   return (
      <Wrapper>
         <BlogDetails />
      </Wrapper>
   )
}

export default index