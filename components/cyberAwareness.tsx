import Image from "next/image";

export default function CyberAwarenessPage() {
    return (
        <div className="bg-white">
            <h1 className="text-3xl font-bold text-center mb-6 bg-white py-4 px-6 shadow-md rounded-lg border-b-4 border-[#003366]">
                Cyber Awareness
            </h1>
            <Image
                src="/cyberAwareness/1.png"
                alt="Cyber Awareness"
                width={800}
                height={600}
                className="mx-auto mb-6 rounded-lg shadow-lg border-2 border-[#003366]"
                priority
            >
            </Image>
            <Image
                src="/cyberAwareness/2.png"
                alt="Cyber Awareness"
                width={800}
                height={600}
                className="mx-auto mb-6 rounded-lg shadow-lg border-2 border-[#003366]"
                priority
            >
            </Image>
            <p className="max-w-3xl mx-auto text-lg text-center mb-6 bg-white py-6 px-6">
                In our country, people woke up to the dangers of cyber attacks when most others were at war and devising strategies to fight the scourge. Only recently, several hacking attacks on large businesses culminated in huge ransom demands. These attacks caught everyone unawares and caused tremendous financial losses together with bruised reputation.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-center mb-6 bg-white py-6 px-6">
                Such incidents have highlighted the importance of cyber security and the issues surrounding it. The pressure from the hackers is mounting and they have the power to put lives in turmoil. Anyone who is not aware of the fact is living dangerously.
            </p>
            <p className="max-w-3xl mx-auto text-lg text-center mb-6 bg-white py-6 px-6">
                The best strategy is to be aware and take proper safety measures.
            </p>
            <Image
                src="/cyberAwareness/3.png"
                alt="Cyber Awareness"
                width={800}
                height={600}
                className="mx-auto mb-6 rounded-lg shadow-lg border-2 border-[#003366]"
                priority
            >
            </Image>
            <Image
                src="/cyberAwareness/4.png"
                alt="Cyber Awareness"
                width={800}
                height={600}
                className="mx-auto mb-6 rounded-lg shadow-lg border-2 border-[#003366]"
                priority
            >
            </Image>
        </div>
    )
}