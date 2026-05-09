import "../CSS/MovieCardSkeleton.css"

function MovieCardSkeleton() {
    return (
        <div className="movie-card-skeleton">
            <div className="skeleton-poster"></div>
            <div className="skeleton-info">
                <div className="skeleton-text title"></div>
                <div className="skeleton-text date"></div>
            </div>
        </div>
    )
}

export default MovieCardSkeleton
