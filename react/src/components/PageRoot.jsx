import { useEffect, useState } from "react";
import Assembly from "./Assembly";
import apiProcessor from "./apiProcessor.js";

// React Bootstrap
import Container from "react-bootstrap/Container";

// CSS
import "./PageRoot.css"

const PageRoot = (args) => {

    const pagesNames = ["Introduction", "Logbook", "Description", "Result", "Links", "Home"]
    const pagesNumbers = [14, 34, 36, 38, 40, 42]
    const pageName = args.pageName
    const pageId = pagesNumbers[pagesNames.indexOf(pageName)]

    const [title, setTitle] = useState("")
    const [content, setContent] = useState([])
    const [loadingState, setLoadingState] = useState("standingBy")

    const loadPage = async () => {
        const response = await fetch('https://62-31-web.marsoni.ch/wp-json/wp/v2/pages/' + pageId);
        if(!response.ok) {
            // oups! something went wrong
            return;
        }
        const post = await response.json();
        setTitle(post.title.rendered)

        let processedContent = apiProcessor(post.content.rendered)

        setContent(processedContent)
        setLoadingState("done")
    }

    useEffect(() => {
        if (loadingState === "standingBy"){
            setLoadingState("inProgress")
            loadPage();
            /*if (pageId !== undefined) {
                return (
                    <Error404 />
                )
            }*/
        }
    });

    const message = () => {
        if (loadingState === "standingBy") {
            return (
                <p>Standing by</p>
            )
        } else if (loadingState === "inProgress") {
            return (
                <p>Loading in progress</p>
            )
        } else if (loadingState === "done") {
            if (content.length === 0) {
                return (
                    <p>The content is unavailable</p>
                )
            } else {
                return (
                    <></>
                )
            }
        }
    }

    return (
        <>
            {message()}
            <h1>{title}</h1>
            <Container fluid="true">
                {
                    content.map( (content, key) => {
                        return (
                            <Assembly key={key} content={content} />
                        )
                    })
                }
            </Container>
        </>
    )
}

export default PageRoot;