export default function SubscriptionPage() {
    return (
        <div>
            <h1 className="text-gray-900 text-3xl font-bold text-center mb-10 bg-white py-4 px-6 shadow-md rounded-lg border-b-4 border-[#003366]">
                Subscriptions
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
                {/* Community Plan */}
                <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-white rounded-lg shadow-sm">
                    <div className="max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-black shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-2xl text-center mb-2 bg-red-700 text-white px-4 py-3">COMMUNITY</div>
                            <div className="text-5xl font-bold text-center text-gray-600 my-5">FREE</div>

                            <div className="space-y-3 mb-6 text-center"><br />
                                <div className="text-gray-600">✅1 SUBSCRIBER</div><hr />
                                <div className="text-gray-600">✅ NEWS</div><hr />
                                <div className="text-gray-600">🚫 MAGAZINE PDF</div><hr />
                                <div className="text-gray-600">🚫 RESEARCH</div><hr />
                                <div className="text-gray-600">🚫 ADVISORY ROOM</div><hr />
                                <div className="text-gray-600">🚫 CYBER PRODUCTS</div><hr />
                                <div className="text-gray-600">🚫 CYBER AFFAIRS</div>
                            </div>

                            <button className="w-full bg-[#FF9102] hover:bg-[#003366] text-white font-bold py-2 px-4 rounded">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bronze Plan */}
                <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-white rounded-lg shadow-sm">
                    <div className="max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-black shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-2xl text-center mb-2 bg-orange-900 text-white px-4 py-3">BRONZE</div>
                            <div className="text-5xl font-bold text-center text-gray-600 mt-5">
                                <span className="text-red-700 text-2xl mx-2 line-through">$50</span>$0
                            </div>
                            <div className="text-[10px] font-bold text-center text-gray-600 mb-5">Annualy</div>

                            <div className="space-y-3 mb-6 text-center"><br />
                                <div className="text-gray-600">✅ 1 SUBSCRIBER</div><hr />
                                <div className="text-gray-600">✅ NEWS</div><hr />
                                <div className="text-gray-600">✅ MAGAZINE PDF</div><hr />
                                <div className="text-gray-600">✅ RESEARCH</div><hr />
                                <div className="text-gray-600">✅ ADVISORY ROOM</div><hr />
                                <div className="text-gray-600">✅ CYBER PRODUCTS</div><hr />
                                <div className="text-gray-600">✅ CYBER AFFAIRS</div>
                            </div>

                            <button className="w-full bg-[#FF9102] hover:bg-[#003366] text-white font-bold py-2 px-4 rounded">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap justify-center gap-4 my-4">
                {/* Silver Plan */}
                <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-white rounded-lg shadow-sm">
                    <div className="max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-black shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-2xl text-center mb-2 bg-neutral-400 text-white px-4 py-3">SILVER</div>
                            <div className="text-5xl font-bold text-center text-gray-600 mt-5">
                                <span className="text-red-700 text-2xl mx-2 line-through">$2500</span>$0
                            </div>
                            <div className="text-[10px] font-bold text-center text-gray-600 mb-5">Annualy</div>

                            <div className="space-y-3 mb-6 text-center"><br />
                                <div className="text-gray-600">✅ 500 SUBSCRIBERS</div><hr />
                                <div className="text-gray-600">✅ NEWS</div><hr />
                                <div className="text-gray-600">✅ MAGAZINE PDF</div><hr />
                                <div className="text-gray-600">✅ RESEARCH</div><hr />
                                <div className="text-gray-600">✅ ADVISORY ROOM</div><hr />
                                <div className="text-gray-600">✅ CYBER PRODUCTS</div><hr />
                                <div className="text-gray-600">✅ CYBER AFFAIRS</div>
                            </div>

                            <button className="w-full bg-[#FF9102] hover:bg-[#003366] text-white font-bold py-2 px-4 rounded">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Gold Plan */}
                <div className="w-full md:w-[calc(50%-1rem)] p-6 bg-white rounded-lg shadow-sm">
                    <div className="max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-black shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-2xl text-center mb-2 bg-yellow-500 text-white px-4 py-3">GOLD</div>
                            <div className="text-5xl font-bold text-center text-gray-600 mt-5">
                                <span className="text-red-700 text-2xl mx-2 line-through">$5000</span>$0
                            </div>
                            <div className="text-[10px] font-bold text-center text-gray-600 mb-5">Annualy</div>

                            <div className="space-y-3 mb-6 text-center"><br />
                                <div className="text-gray-600">✅ UNLIMITED SUBSCRIBERS</div><hr />
                                <div className="text-gray-600">✅ NEWS</div><hr />
                                <div className="text-gray-600">✅ MAGAZINE PDF</div><hr />
                                <div className="text-gray-600">✅ RESEARCH</div><hr />
                                <div className="text-gray-600">✅ ADVISORY ROOM</div><hr />
                                <div className="text-gray-600">✅ CYBER PRODUCTS</div><hr />
                                <div className="text-gray-600">✅ CYBER AFFAIRS</div>
                            </div>

                            <button className="w-full bg-[#FF9102] hover:bg-[#003366] text-white font-bold py-2 px-4 rounded">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}