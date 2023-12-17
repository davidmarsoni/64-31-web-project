import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firestore.js'
import { useEffect, useState } from "react";
import Assembly from "./Assembly";

const PageRoot = (args) => {

    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [content, setContent] = useState([])
    const [loadingState, setLoadingState] = useState("standingBy")

    let sectionsData = null;
    let useEffectDone = false;
    let page = [];

    const getPageData = async () => {
        const docRef = doc(db, "pages", args.pageName);
        const interestPage = await getDoc(docRef);
        const interestPageData = interestPage.data();
        setTitle(interestPageData.title);
        setSubtitle(interestPageData.subtitle);

        // gather the subcollection "articles" from the document "Intro"
        const sections = await getDocs(collection(db, "pages", interestPage.id, "sections"));
        sectionsData = sections.docs.map(doc => ({id: doc.id, ...doc.data()}));
        // concat the content of each article in the html variable
        console.log("sections", sectionsData)
        for (const sectionId in sectionsData) {
            const section = sectionsData[sectionId];
            let contentId = 0;
            while (section[contentId] != null) {
                let sectionData = section[contentId];
                let sectionSplit = sectionData.split(":");
                console.log(section[contentId])
                if (sectionSplit[0] === "img") {
                    if (sectionSplit[1] === "firebase") {
                        // the content is the image in firebase
                        let trueLink = sectionData.substring(sectionSplit[0].length + sectionSplit[1].length + 2, sectionData.length);
                        let imgRef = ref(storage, trueLink);
                        let imgURL = await getDownloadURL(imgRef);
                        addToContent("img", imgURL);
                    } else {
                        // the content is a link to an image
                        let trueLink = sectionData.substring(sectionSplit[0].length + 1, sectionData.length);
                        addToContent("img", trueLink);
                    }
                } else {
                    // the content is html code
                    addToContent("html", sectionData);
                }
                contentId++;
            }
        }
        setLoadingState("done")
    }

    useEffect(() => {
        if (loadingState === "standingBy"){
            setLoadingState("inProgress")
            getPageData();
        }
    });

    const noPageContent = () => {
        return content.length === 0 && <div>No content found</div>
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
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                {noPageContent()}
                {content.map(value => {
                    console.log(value.key, value.type, value.data);
                    return <Assembly key={value.key} type={value.type} data={value.data}/>
                })}
            </div>
        </>
    )
}

export default PageRoot;