"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import TeamFounder from "./TeamFounder"
import team_data from "@/data/TeamData";
import Link from "next/link";



const Team = () => {
   
   return (
      <div className="pt-130 pb-140 overflow-hidden position-relative z-index-common">
         <div className="bg-gradient-1">
            
         </div>
         <TeamFounder />

         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="text-center">
                     
                  </div>

                  
               </div>
            </div>
         </div>

      </div>
   )
}

export default Team