import { useState } from 'react'
import Star from './Star'



const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
};


interface propsType {
    maxRating: number,
    size: number,
    setUserRating: React.Dispatch<React.SetStateAction<number>>,
    ratingData?:number
}

const StarRating = ({ maxRating = 5, size = 48, setUserRating, ratingData }: propsType) => {
    const [rating, setRating] = useState<number>(ratingData?ratingData:0)
    const [tempRating, setTempRating] = useState<number>(0);

    const handleRating = (rating: number) => {
        setRating(rating);
        setUserRating(rating)
    }
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        size={size}
                    />
                ))}
            </div>
        </div>
    )
}

export default StarRating