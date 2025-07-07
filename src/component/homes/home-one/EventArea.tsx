import Image from "next/image"
import Link from "next/link"

import event_bg from "@/assets/img/update/bg/bg-gradient1-2.jpg"
import event_photo_1 from "@/assets/img/events/oradea.jpg"
import event_photo_2 from "@/assets/img/events/cluj.jpg"

const event_data_custom = [
  {
    id: 1,
    thumb: event_photo_1,
    title: "FinTech meets Blockchain: Comets of Web3",
    country: "Oradea",
    date: "17 June 2025"
  },
  {
    id: 2,
    thumb: event_photo_2,
    title: "Comets of Web3 x Sui Foundation",
    country: "Cluj",
    date: "26 June 2025"
  },
  {
    id: 3,
    title: "Upcoming Event?",
    country: "To be announced",
    date: "TBD"
  }
]

const EventArea = () => {
  return (
    <div className="pt-130 pb-140 bg-black2 overflow-hidden position-relative z-index-common">
      <div className="bg-gradient-4">
        <Image src={event_bg} alt="img" />
      </div>

      <div className="event-area">
        <div className="container">
          <div className="section-title text-center mb-50">
            <h2 className="title style2">Events We Attended</h2>
          </div>

          <div className="row gy-60 gx-30 justify-content-center">
            {event_data_custom.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6">
                <div className="event-card">
                  <div className="event-card-img">
                    <Link href="#">
                      {item.thumb && (
                        <Image src={item.thumb} alt="event image" />
                      )}
                    </Link>
                  </div>

                  <div className="event-card-content">
                    <h4 className="event-card-title">
                      <Link href="/contact">{item.title}</Link>
                    </h4>
                    <div className="event-meta">
                      <Link href="#">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.99895 8.95321C9.1477 8.95321 10.0789 8.02197 10.0789 6.87321C10.0789 5.72446 9.1477 4.79321 7.99895 4.79321C6.85019 4.79321 5.91895 5.72446 5.91895 6.87321C5.91895 8.02197 6.85019 8.95321 7.99895 8.95321Z" stroke="var(--tg-primary-color)" strokeWidth="1.5" />
                          <path d="M2.41281 5.65992C3.72615 -0.113413 12.2795 -0.106746 13.5861 5.66659C14.3528 9.05325 12.2461 11.9199 10.3995 13.6933C9.05948 14.9866 6.93948 14.9866 5.59281 13.6933C3.75281 11.9199 1.64615 9.04659 2.41281 5.65992Z" stroke="var(--tg-primary-color)" strokeWidth="1.5" />
                        </svg>
                        {item.country}
                      </Link>
                      <Link href="#">
                        <i className="far fa-clock"></i>
                        {item.date}
                      </Link>
                    </div>
                    <Link href="#" className="btn btn3">
                      {item.date === "TBD" ? "STAY TUNED" : "VIEW EVENT"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventArea
