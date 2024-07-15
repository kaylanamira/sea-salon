import { Review } from "@/app/models/Review";
import { Reservation } from "@/app/models/Reservation";
import { User } from "@/app/models/User";
import connectToDb from "./connectToDb";

export const getReviews = async () =>{
    try {
        connectToDb();
        const reviews = await Review.find()
        return reviews
    } catch (error) {
        console.log(error);
        throw new Error("Fail fetching review")
    }
}

export const getReservation = async (slug) =>{
    try {
        connectToDb();
        const reservation = await Reservation.findById(slug)
        return reservation
    } catch (error) {
        console.log(error);
        throw new Error("Fail fetching reservation")
    }
}

export const getUser = async (id) =>{
    try {
        connectToDb();
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log(error);
        throw new Error("Fail fetching user")
    }
}
