import NewsCard from "./mainCard";

export default function MainArticles() {
    return (
        <div>
            <NewsCard
                imageSrc="/usDefense.jpg"
                title="Data from USDefense.Org Stolen"
                author="DG MAGAZINE"
                shortDescription="HACKERS USED IMPACKET, COVALENTSTEALER FOR THEIR PURPOSE A joint advisory by The Cybersecurity and Infrastructure Security Agency (CISA), Federal Bureau of Investigation (FBI) and the National Security .."
                publishDate={new Date('2022-11-06')}
                views={535}
                commentsCount={0}
                href="/data-from-usdefense-org-stolen"
            />
            <NewsCard
                imageSrc="/curiouscase.png"
                title="The Curious Case of PM's Leaked Audios"
                author="DG MAGAZINE"
                shortDescription="The Curious Case of PM&apos;s Leaked Audios OVER 100 HOURS OF TAPES UP FOR SALE ON DARK WEB Leaked audio tapes purported to be conversations of Prime Minister Shahbaz Sharif with his administration staff .."
                publishDate={new Date('2021-05-15')}
                views={839}
                commentsCount={2}
                href="/news/curious-case-pm-audios"
            />
            <NewsCard
                imageSrc="/smartcities.png"
                title="Are Smart Cities Really Secure?"
                author="DG MAGAZINE"
                shortDescription="There was a time when the word SMART was used solely for humans—only exception were blondes. But things have taken a dramatic turn. Now everything—mostly inanimate objects—from mobile phones .."
                publishDate={new Date('2023-10-01')}
                views={345}
                commentsCount={0}
                href="/are-smart-cities-really-secure"
            />
            <NewsCard
                imageSrc="/greenland.png"
                title="Condition of Greenlands Health Services Critical?"
                author="DG MAGAZINE"
                shortDescription="ATTACK LAUNCHED ON MAY 9.  PATIENT RECORDS REMAIN INACCESSIBLE. The country&apos;s government, Naalakkersuisut, has said that Greenlands healthcare system is severely limited because of a cyber .."
                publishDate={new Date('2022-06-12')}
                views={1269}
                commentsCount={5}
                href="/condition-of-greenlands-health-services-critical"
            />
            <NewsCard
                imageSrc="/sensitiveGoverment.png"
                title="Sensitive Government Websites in Italy Hacked"
                author="DG MAGAZINE"
                shortDescription="INVESTIGATORS BELIEVE PRO-RUSSIAN GROUPS ARE BEHIND THE ATTACK. Among those hit by the malware are websites operated by Italian parliament, military, Defense Ministry, Senate and National Health Institute. .."
                publishDate={new Date('2022-10-15')}
                views={337}
                commentsCount={0}
                href="/sensitive-government-websites-in-italy-hacked"
            />
            <NewsCard
                imageSrc="/dataExposed.png"
                title="Data of 500,000+ Students and Staff Exposed"
                author="DG MAGAZINE"
                shortDescription="RANSOMWARE ATTACK BEHIND THE SCENE. The Chicago Public Schools revealed that data of more than 500,000 students and employees have been exposed as a result of a ransomware attack. The hackers targeted .."
                publishDate={new Date('2022-10-15')}
                views={400}
                commentsCount={0}
                href="/data-of-500000-students-and-staff-exposed"
            />
        </div>
    )
}