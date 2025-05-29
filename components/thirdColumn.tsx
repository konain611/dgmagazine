

import InfoCard from "./Card";

export default function RecentWidgets() {

    return (
        <div>
            <InfoCard
                heading="btc mining"
                image="/images/articles/btc.png"
                link="/articles/btc-mining-competition"
            />
            <InfoCard
                heading="subscribe now"
                image="/snow.png"
                link="/"
            />
            {/* <InfoCard
                heading="best review"
                image="/"
                link="/"
            /> */}
            <InfoCard
                heading="download pdf"
                image="/downloadPDF.png"
                link="/"
            />
            {/* <InfoCard
                heading="calender"
                image="/"
                link="/"
            /> */}
          
           
        </div>
    )
}