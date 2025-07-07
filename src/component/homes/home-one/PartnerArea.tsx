"use client"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Slider from "react-slick";

import partnerThumb_1 from "@/assets/img/update/client/client-1-4.svg"
import partnerThumb_2 from "@/assets/img/update/client/client-1-2.svg"
import partnerThumb_3 from "@/assets/img/update/client/client-1-5.svg"
import partnerThumb_4 from "@/assets/img/update/client/client-1-4.svg"


interface DataType {
   id: number;
   icon: StaticImageData;
   desc: JSX.Element;
}[];

const partner_data: DataType[] = [
   {
      id: 1,
      icon: partnerThumb_1,
      desc: (<>Built on BNB Chain, because winning starts with the right foundation</>),
   },
   {
      id: 2,
      icon: partnerThumb_2,
      desc: (<>Powered by NVIDIA devices, because AI needs real performance.</>),
   },
   {
      id: 3,
      icon: partnerThumb_3,
      desc: (<>Powered by AMD, because the most advanced AI needs next-gen silicon.</>),
   },
 
];

const settings={
   dots: true,
	infinite: true,
	speed: 1000,
	autoplay: true,
	spaceBetween: 30,
	arrows: false,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
	]
}


const PartnerArea = () => {
   return (
      <div className="pt-130 bg-black2 pb-20">
         <div className="container">
            <div className="section-title text-center mb-50">
               <h2 className="title style2">Powered By</h2>
            </div>
            <div className="slider-area">
               <Slider {...settings} className="row partner-slider1">
                  {partner_data.map((item) => (
                     <div key={item.id} className="col-lg-4">
                        <div className="partner-card">
                           <div className="partner-card-img">
                              <Image src={item.icon} alt="img" />
                           </div>
                           <p className="partner-card-text">{item.desc}</p>
                           <Link className="btn btn3" href="/blog">EXPLORE</Link>
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default PartnerArea
