// dompurifier
const DOMPurify = require('dompurify')(window);

const apiProcessor = (apiData) => {
    // Process the content
    // Remove the \n, \n\n\n and \n\n\n\n
    let processedContent = apiData.replaceAll("\n\n\n\n", "\n")
    processedContent = processedContent.replaceAll("\n\n\n", "\n")
    processedContent = processedContent.replaceAll("\n\n", "\n")

    // Separate the content by \n
    processedContent = DOMPurify.sanitize(processedContent).split("\n")
    processedContent = removeEmptyLines(processedContent)

    return processedContent;
}

const removeEmptyLines = (array) => {
    return array.filter((line) => {
        return line !== "";
    });
}

export default apiProcessor;