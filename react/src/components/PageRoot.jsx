import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firestore.js'
import { useEffect, useState } from "react";
import Assembly from "./Assembly";
import Error404 from "../pages/Error404";

const PageRoot = (args) => {

    const pagesNames = ["Introduction", "Logbook", "Description", "Result", "Links"]
    const pagesNumbers = [14]
    const pageName = args.pageName
    const pageId = pagesNumbers[pagesNames.indexOf(pageName)]

    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [content, setContent] = useState([])
    const [loadingState, setLoadingState] = useState("standingBy")

    const loadPage = async () => {
        console.log(pageId)
        const response = await fetch('https://62-31-web.marsoni.ch/wp-json/wp/v2/pages/' + pageId);
        if(!response.ok) {
            // oups! something went wrong
            return;
        }
        const post = await response.json();
        console.log(post.content.rendered);
        setContent(post.content.rendered)
        setLoadingState("done")
    }

    useEffect(() => {
        if (loadingState === "standingBy"){
            setLoadingState("inProgress")
            loadPage().then(response => {
                console.log(response);
            });
            /*if (pageId !== undefined) {
                return (
                    <Error404 />
                )
            }*/
        }
    });

    const noPageContent = () => {
        return content.length === 0 && <div>No content found.</div>
    }

    const addToContent = (type = "", data) => {
        const element = {
            key: content.length,
            type: type,
            data: data
        }
        content.push(element)
        console.log("added : " + type + " , " + data)
    }

    return (
        <>
            <div>
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
        </>
    )
}

export default PageRoot;