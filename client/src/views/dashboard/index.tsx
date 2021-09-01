import React, {ChangeEvent, FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../redux";

export const Dashboard: FC = () => {
    const [nr, setNr] = useState<number>(0)
    const dispatch = useDispatch()

    const x = useSelector((state: RootState) => {
            return state.user.isLogged
        })
    console.log(x)

    const handleSubmit = (amount: number)  => {
        console.log("xxx")
    }

    const clickme = () => {
        console.log("xxx")
    }

    return(
        <div>
            <h1>dashboard screen</h1>
            {nr}
            <input value={nr} onChange={(e: ChangeEvent<HTMLInputElement>) => setNr(parseInt(e.target.value))} />
            <button type={"submit"} onClick={() =>handleSubmit(nr)}>calculate</button>
        <button onClick={clickme}>clickme</button>
        </div>
    )
}