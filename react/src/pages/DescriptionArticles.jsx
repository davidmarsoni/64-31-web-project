import React, { useState, useEffect } from 'react';
import Skill from '../components/Skill.js';

const DOMPurify = require('dompurify')(window);

const DescriptionArticles = () => {
    const [content, setContent] = useState([])
    const [loadingState, setLoadingState] = useState("standingBy")
    const postsNumbers = [86,68]

    const loadPosts = async () => {
        console.log("loadPosts")
        
        for (const postNumber of postsNumbers) {
            const response = await fetch('https://62-31-web.marsoni.ch/wp-json/wp/v2/posts/' + postNumber);
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
            const post = await response.json();
    
            // Process the content
            // Remove the \n, \n\n\n and \n\n\n\n
            let processedContent = post.content.rendered.replaceAll("\n\n\n\n", "\n")
            processedContent = processedContent.replaceAll("\n\n\n", "\n")
            processedContent = processedContent.replaceAll("\n\n", "\n")
    
            // Separate the content by \n
            processedContent = DOMPurify.sanitize(processedContent).split("\n")
            processedContent = removeEmptyLines(processedContent)

            let stripedContent = stripHtml(processedContent);
            let imageHTML = processedContent[processedContent.length - 1]
            let image = imageHTML.match(/src="([^"]*)"/)[1];

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
        console.log("useEffect")
        if (loadingState === "standingBy"){
            setLoadingState("inProgress")
            loadPosts();
        }
    }, []);
    return (
        <div className="description-articles">   {
            content.map(content => {
                console.log("MON CONTENT",content)
                return (
                <Skill 
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

 const removeEmptyLines = (array) => {
    return array.filter((line) => {
        return line !== "";
    });
 }
export default DescriptionArticles;
