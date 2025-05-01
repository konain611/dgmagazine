import NewsCard from "./mainCard";

export default function MainArticles() {
    return (
        <div>
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
        </div>
    )
}