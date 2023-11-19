import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import React from 'react'

function Recipe() {
    const [details, setDetails] = useState({});
    const [aciteveTab, setActiveTab] = useState("instructions");
    let params = useParams();

    const fetchDeatails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_API_URL}`)
        const detailData = await data.json();

        setDetails(detailData);
    }

    useEffect(() => {
        fetchDeatails();
    }, [params.name]);
    return (
        <DetailWrapper key={details.id}>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title}></img>
            </div>
            <Info>
                <Button className={aciteveTab === "instructions" ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button className={aciteveTab === "ingridients" ? 'active' : ''} onClick={() => setActiveTab('ingridients')}>Ingridients</Button>
                {aciteveTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div>

                )}
                {aciteveTab === 'ingridients' && (


                    <ul>
                        {details.extendedIngredients.map((ingridient) => (
                            <li key={ingridient.id}>{ingridient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    )
}


const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color:white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background:white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    `

const Info = styled.div`
    margin-left: 10rem;
`

export default Recipe