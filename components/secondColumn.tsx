import InfoCard from "./Card";

export default function PopularPosts() {
    return (
        <div>
            <InfoCard
                heading="5g network"
                image="/images/articles/5g.jpg"
                link="/articles/5g-network"
            />
            <InfoCard
                heading="popular posts"
                image="/greenland.png"
                link="/condition-of-greenlands-health-services-critical"
            />
            <InfoCard
                heading="bitcoin"
                image="/images/articles/bitcoin.jpg"
                link="/articles/bitcoin-in-pakistan"
            />
            <InfoCard
                heading="Cyber Policy In Pakistan"
                image="/cyberpolicy.png"
                link="/cyber-policy-in-pakistan"
            />
            <InfoCard
                heading="KE HACKED: Lessons to Learn"
                image="/ke.jpeg"
                link="/"
            />
            <InfoCard
                heading="Advertisement"
                image="/advertisement.jpg"
                link="/"
            />
            {/* <InfoCard
                heading="Recent Reviews"
                image="/"
                link="/"
            /> */}
        </div>
    )
}