// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {collection, getDoc, getDocs , doc} from "firebase/firestore";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import { db, storage } from '../config/firestore.js'
import {useEffect} from "react";

const Pages = (param) => {

    let title = "";
    let content = "<div class='content'>";
    let useEffectDone = false;

    const getPages = async () => {
        const docRef = doc(db, "pages", param.pageName);
        const interestPage = await getDoc(docRef);
        const interestPageData = interestPage.data();

        // get the title of the page
        title = "<h1>" + interestPageData.title + "</h1>";
        // if the subtitle is not empty, add it to the title
        if (interestPageData.subtitle != "") {
            title += "<h2>" + interestPageData.subtitle + "</h2>";
        }

        // gather the subcollection "articles" from the document "Intro"
        const sections = await getDocs(collection(db, "pages", interestPage.id, "sections"));
        const sectionsData = sections.docs.map(doc => ({id: doc.id, ...doc.data()}));
        // concat the content of each article in the html variable
        console.log("sections", sectionsData)
        for (const sectionId in sectionsData) {
            content += "<div class='article'>";
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
                        content += "<img src='" + imgURL + "' alt='img'>";
                    } else {
                        // the content is a link to an image
                        let trueLink = sectionData.substring(sectionSplit[0].length + 1, sectionData.length);
                        content += "<img src='" + trueLink + "' alt='img'>";
                    }
                } else {
                    // the content is html code
                    content = content + section[contentId];
                }
                contentId++;
            }
            content += "</div>";
        }

        content += "</div>";
        // apply the html to the site
        document.getElementById("title").innerHTML = title;
        document.getElementById("content").innerHTML = content;
    }

    useEffect(() => {
        // the code is here because I don't know why it repeats itself twice
        if (!useEffectDone) {
            useEffectDone = true;
            getPages();
        }
    });

    return (
        <div>
            <div id={'title'}></div>
            <div id={'content'}></div>
        </div>
    )
}

export default Pages

