import { useState } from "react";
import api from "../../../lib/api"
import swal from 'sweetalert';

const useReview = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const handleReview = async (product: string | number) => {
        if (!rating || comment.trim() === "") {
            swal("Please provide both a rating and a comment.");
            return
        }
        setIsLoading(true);
        try {
            await api.post('/review/reviewcreate/', { rating, comment: comment.trim(), product })
            swal("Review Added Successfully")
            setIsOpen(false);
        } catch (error: any) {
            swal(error.response?.data?.message || "Failed to add review");
        } finally {
            setIsLoading(false);
        }
    }

    return { rating, setRating, comment, setComment, handleReview, isLoading, isOpen, setIsOpen }
}

export default useReview