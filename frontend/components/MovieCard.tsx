type movieCardDetails = {
    title: string;
    imageUrl: string;
    releaseYear: string;
}

export default function MovieCard({title, imageUrl, releaseYear}: movieCardDetails) {
    return (
        <>           
            <div className="max-w-sm rounded overflow-hidden shadow-lg w-64 h-88">
                <div className="object-contain">
                    <img className="w-full h-80 object-contain object-fit-center" src={imageUrl} alt={title} />
                    <div className="p-4">
                        <h3 className="text-gray-700 font-semibold">{title} ({releaseYear})</h3>
                    </div>
                </div>
            </div>
        </>
    )
}