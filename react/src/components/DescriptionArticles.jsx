import React, { useState, useEffect } from 'react';
import Skill from './Skill.js';
import apiProcessor from "./apiProcessor.js";
import {searchImageSrc} from "./apiProcessor.js";

const DescriptionArticles = () => {
    const [content, setContent] = useState([])
    const [loadingState, setLoadingState] = useState("standingBy")
    //this is the article post number in the URL. it's in the order from top to bottom
    const postsNumbers = [68,111,106,122,135,139,173,142,145,148,151,154,157,160,163,167,170]

    const loadPosts = async () => {
        for (const postNumber of postsNumbers) {
            const response = await fetch('https://62-31-web.marsoni.ch/wp-json/wp/v2/posts/' + postNumber);
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
            const post = await response.json();
    
            let processedContent = apiProcessor(post.content.rendered)

            let stripedContent = stripHtml(processedContent);
            let imageHTML = processedContent[processedContent.length - 1]
            let image = searchImageSrc(imageHTML)

            // Useable data
            let array = []
            array.push(post.title.rendered) // Title
            array.push(stripedContent[stripedContent.length - 3]) // File
            array.push(stripedContent[stripedContent.length - 2]) // Line
            array.push(image) // Image
            let description = [];
            for (let i = 0; i < stripedContent.length - 3; i++) {
                description.push(stripedContent[i]);
            }
            array.push(description) // Description
            let newContentArray = content
            newContentArray.push(array)
            setContent(newContentArray)
        }
        setLoadingState("done")
    }
    
    useEffect(() => {
        if (loadingState === "standingBy"){
            setLoadingState("inProgress")
            loadPosts();
        }
    }, []);
    return (
        <div className="description-articles">   {
            content.map( (content, key) => {
                return (
                <Skill
                    key={key}
                    title={content[0]}
                    description={content[4]}
                    file={content[1]}
                    fileLine={content[2]}
                    finalImage={content[3]}
                />
                )
            })

        }     
    
       </div>
    );
};

 // Function to strip HTML tags from a string
 const stripHtml = (htmlArray) => {
    return htmlArray.map(htmlString => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    });
 }
export default DescriptionArticles;
